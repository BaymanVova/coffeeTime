import {combineReducers, Reducer} from "redux";
import {entitiesReducer} from "../../modules/entities/entitiesReducer";
import {IAppState, INavigationState} from "./appState";
import {Reducers} from "./Reducers";
import {systemReducer} from "./systemReducer";
import {NavigationConfig} from "../../navigation/config";
import {authReducer} from "../../modules/AuthPage/AuthReducer";
import {listCafeReducer} from "../../modules/ListCafePage/ListCafeReducer";
import {registrationReducer} from "../../modules/RegistrationPage/RegistrationReducer";
import {cafeInfoReducer} from "../../modules/CafePage/CafeReducer";
import {drinkReducer} from "../../modules/DrinkPage/DrinkReducer";

export function createMainReducer(combineMethod: (reducers: any) => Reducer<IAppState>): Reducer<IAppState> {
    const navigationReducers: Reducers<INavigationState> = NavigationConfig.instance.getReducer();

    const reducers: Reducers<IAppState> = {
        navigation: combineReducers(navigationReducers),
        system: systemReducer,
        entities: entitiesReducer,
        auth: authReducer,
        listCafe: listCafeReducer,
        cafeInfo: cafeInfoReducer,
        registration: registrationReducer,
        drinkInfo: drinkReducer,
    };

    return combineMethod(reducers);
}
