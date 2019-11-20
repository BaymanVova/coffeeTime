import {NavigationAction, NavigationActions} from "react-navigation";
import {SimpleThunk} from "../common/simpleThunk";
import {actionCreator} from "../core/store";
import {getBackAction} from "./navigation";
import {Pages} from "./pages";

const NavigationPages = new Pages();

function simpleToRoute(routeName: string): () => NavigationAction {
    return (): NavigationAction => NavigationActions.navigate({routeName});
}

function routeWithParams<T>(routeName: string): (params: T) => NavigationAction {
    return (params: T): NavigationAction => NavigationActions.navigate({routeName, params});
}

export class Actions {
    toTab(tab: string): NavigationAction {
        return simpleToRoute(tab)();
    }

    navigateToPlayground = simpleToRoute(NavigationPages.playground);
    navigateToCafePage = routeWithParams<ICommonNavParams>(NavigationPages.cafe);
    navigateToAuthPage = simpleToRoute(NavigationPages.auth);
    navigateToRegistration = simpleToRoute(NavigationPages.registration);
    navigateToMain = simpleToRoute(NavigationPages.main);
    navigateToListCafe = simpleToRoute(NavigationPages.listCafe);
    navigateToDrink = routeWithParams<ICommonNavParams>(NavigationPages.drink);

    navigateToBack = (): SimpleThunk => {
        return async (dispatch, getState): Promise<void> => {
            const backAction = getBackAction(getState().navigation);

            if (backAction != null) {
                dispatch(backAction);
            }
        };
    };

    internal = {
        backInRoot: actionCreator("AppNavigation/BACK_IN_ROOT"),
    };
}

export interface ICommonNavParams {
    id: string;
}
