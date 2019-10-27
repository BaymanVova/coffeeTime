import React from "react";
import {View} from "react-native";
import {ImageResources} from "../../common/ImageResources.g";
import {HeaderButton} from "../../navigation/components/HeaderButton";
import {NavigationActions} from "../../navigation/navigation";
import {Colors} from "./colors";
import {HeaderWrapper} from "../../navigation/components/HeaderWrapper";
import {eventRegister} from "../../common/eventRegister";
import {NavigationStackOptions} from "react-navigation-stack";

export const NoHeaderNavigation: NavigationStackOptions = {
    header: null,
};

export function mainHeaderNavigation(mode: "back", right: "none" | "event", eventName?: string):
    NavigationStackOptions {
    const rightImage = ImageResources.image_back;
    const rightAction = NavigationActions.navigateToBack;
    const eventClick = (): void => eventRegister.emitEvent(eventName!);

    let rightNode: JSX.Element;

    switch (right) {
        case "event":
            rightNode = <HeaderButton image={ImageResources.image_back} onPress={eventClick}/>;
            break;
        default:
            rightNode = <View/>;
            break;
    }

    return {
        header: (props: any): any => <HeaderWrapper {...props}/>,
        headerLeft: (): JSX.Element => <HeaderButton image={rightImage} action={rightAction}/>,
        headerRight: rightNode,
        headerTitle: "",
        headerStyle: {
            borderBottomWidth: 0,
            elevation: 0,
            backgroundColor: Colors.transparent,
        },
    };
}