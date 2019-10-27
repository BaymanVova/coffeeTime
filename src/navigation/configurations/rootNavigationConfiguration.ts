import {Playground} from "../../common/playground";
import {extendWithDontPushTwoPageInStack} from "../extendWithDontPushTwoPageInStack";
import {NavigationPages} from "../navigation";
import {InDeveloping} from "../../common/components/InDeveloping";
import { createStackNavigator } from "react-navigation-stack";
import {CafePage} from "../../modules/CafePage/CafePage";
import {MainPage} from "../../modules/MainPage/MainPage";
import {AuthPage} from "../../modules/AuthPage/AuthPage";
import {RegistrationPage} from "../../modules/RegistrationPage/RegistrationPage";
import {ListCafePage} from "../../modules/ListCafePage/ListCafePage";
import {DrinkPage} from "../../modules/DrinkPage/DrinkPage";

export const RootNavigator = createStackNavigator({
    [NavigationPages.main]: {screen: MainPage},
    [NavigationPages.registration]: {screen: RegistrationPage},
    [NavigationPages.auth]: {screen: AuthPage},
    [NavigationPages.cafe]: {screen: CafePage},
    [NavigationPages.drink]: {screen: DrinkPage},
    [NavigationPages.listCafe]: {screen: ListCafePage},
    [NavigationPages.playground]: {screen: Playground},
    [NavigationPages.inDevelopment]: {screen: InDeveloping},
}, {
    headerMode: "screen",
});

extendWithDontPushTwoPageInStack(RootNavigator.router);
