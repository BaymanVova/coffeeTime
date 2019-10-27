import {NavigationState} from "react-navigation";
import {EntitiesInitialState, IEntitiesState} from "../../modules/entities/entitiesState";
import {ISystemState, SystemInitialState} from "./systemState";
import {NavigationConfig} from "../../navigation/config";
import {AuthInitialState, IAuthState} from "../../modules/AuthPage/AuthState";
import {IListCafeState, ListCafeInitialState} from "../../modules/ListCafePage/ListCafeState";
import {IRegistrationState, RegInitialState} from "../../modules/RegistrationPage/RegistrationState";
import {CafeInfoInitialState, ICafeState} from "../../modules/CafePage/CafeState";
import {DrinkInitialState, IDrinkState} from "../../modules/DrinkPage/DrinkState";

export interface IAppState {
    navigation: INavigationState;
    system: ISystemState;
    entities: IEntitiesState;
    auth: IAuthState;
    listCafe: IListCafeState;
    registration: IRegistrationState;
    cafeInfo: ICafeState;
    drinkInfo: IDrinkState;
}

export interface INavigationState {
    root: NavigationState;
}

export function getAppInitialState(): IAppState {
    const NavigationInitialState: INavigationState = NavigationConfig.instance.getCombinedInitialState();

    return {
        navigation: NavigationInitialState,
        system: SystemInitialState,
        entities: EntitiesInitialState,
        auth: AuthInitialState,
        listCafe: ListCafeInitialState,
        registration: RegInitialState,
        cafeInfo: CafeInfoInitialState,
        drinkInfo: DrinkInitialState,
    };
}
