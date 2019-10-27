import {createStore, Store} from "redux";
import {persistCombineReducers, persistStore, PersistConfig} from "redux-persist";
import {buildStack} from "redux-stack";
import {newState} from "../../common/newState";
import {ignorePromise} from "../../common/utils";
import {IEntitiesState} from "../../modules/entities/entitiesState";
import {bugsnagLog, BugsnagConfiguration} from "../BugsnagConfiguration";
import {appSettingsProvider} from "../settings";
import {getAppInitialState, IAppState} from "./appState";
import {createMainReducer} from "./createMainReducer";
import {keyboardDismissOnNavigation} from "./init/keyboardClose";
import {reduxLoggerInit} from "./init/loggerInit";
import {promiseInit} from "./init/promiseInit";
import {thunkInit} from "./init/thunkInit";
import AsyncStorage from "@react-native-community/async-storage";
import {NavigationConfig} from "../../navigation/config";
import {Client} from "bugsnag-react-native";

export enum MigrateStoreMode {
    none = "none",
    purge = "purge",
    resetStatePreserveToken = "resetStatePreserveToken",
    resetStateWithToken = "resetStateWithToken",
}

export function configureStore(
    callback: () => void,
    options: { migrateMode: MigrateStoreMode }): { store: Store<IAppState>, persistor: any } {
    const {enhancer} = buildStack([
        thunkInit,
        promiseInit,
        NavigationConfig.instance.reduxStack,
        reduxLoggerInit,
        keyboardDismissOnNavigation,
        bugsnagLog,
    ]);

    const migrateStore: Map<MigrateStoreMode, (state: IAppState) => Promise<IAppState>> = new Map();
    migrateStore.set(MigrateStoreMode.purge, () => Promise.resolve(getAppInitialState()));
    migrateStore.set(MigrateStoreMode.none, tryProcessStateUpdate);
    migrateStore.set(MigrateStoreMode.resetStatePreserveToken, resetState);
    migrateStore.set(MigrateStoreMode.resetStateWithToken, resetStateWithToken);

    const persistConfig: PersistConfig<IAppState> = {
        key: "root",
        storage: AsyncStorage,
        debug: appSettingsProvider.settings.environment == "Development",
        migrate: migrateStore.get(options.migrateMode)! as any,
        transforms: [],
        timeout: 0,
        blacklist: [],
    };
    const combinedReducer = createMainReducer((reducers: any) => persistCombineReducers(persistConfig, reducers));
    const store = createStore(combinedReducer, enhancer);
    const persistor = persistStore(store, undefined, callback);
    if (options.migrateMode == MigrateStoreMode.purge) {
        ignorePromise(persistor.purge());
    }

    return {store, persistor};
}

function tryProcessStateUpdate(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();

    if (state == null) {
        return Promise.resolve(AppInitialState);
    }

    const nState: IAppState = state;

    const fromBuild = nState.system.buildNumber;

    let resultState: IAppState;
    if (fromBuild < appSettingsProvider.settings.build) {
        const metadata = {
            from: fromBuild,
            to: appSettingsProvider.settings.build,
        };
        console.warn("UpdateState", metadata);
        BugsnagConfiguration.runIfConfigured((client: Client) => client.leaveBreadcrumb("upgrade", metadata));

        resultState = newState(AppInitialState, {
            system: {
                buildNumber: appSettingsProvider.settings.build,
                authToken: nState.system.authToken,
                refreshToken: nState.system.refreshToken,
            },
            entities: {
                user: nState.entities.user,
                language: nState.entities.language,
            } as IEntitiesState,
        });
    } else {
        resultState = Object.assign({}, AppInitialState, nState);
    }

    return Promise.resolve(resultState);
}

function resetStateWithToken(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();
    const nState: IAppState = state;

    if (nState == null) {
        return Promise.resolve(AppInitialState);
    }

    return Promise.resolve(newState(AppInitialState,
        {
            system: {
                buildNumber: appSettingsProvider.settings.build,
                authToken: null,
                refreshToken: null,
            },
            entities: {
                user: null,
                language: state.entities.language,
            } as IEntitiesState,
        }));
}

function resetState(state: IAppState): Promise<IAppState> {
    const AppInitialState = getAppInitialState();

    if (state == null) {
        return Promise.resolve(AppInitialState);
    }

    return Promise.resolve(newState(AppInitialState,
        {
            system: {
                buildNumber: state.system.buildNumber,
                authToken: state.system.authToken,
                refreshToken: state.system.refreshToken,
            },
            entities: {
                user: state.entities.user,
                language: state.entities.language,
            } as IEntitiesState,
        }));
}