import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import React from "react";
import {HeaderButton} from "../../navigation/components";
import {ImageResources} from "../ImageResources.g";
import {NavigationActions} from "../../navigation/navigation";
import {ImageURISource, View, ViewStyle} from "react-native";
import {isIos} from "../../core/theme";
import {NavigationStackOptions} from "react-navigation-stack";

export function NoHeader(): NavigationStackOptions {
    return ({
        header: null,
    });
}

export function PlainHeader(params: {
    title: string;
    showBackButton?: boolean;
    headerStyle?: ViewStyle;
    backIcon?: ImageURISource;
    backAction?: () => any;
}): NavigationStackOptions {
    const {title, showBackButton = true, backAction, backIcon = ImageResources.image_back_black, headerStyle} = params;

    return ({
        headerTitle: title,
        headerTitleStyle: CommonHeaderStyles.headerTitleStyle,
        headerLeft: (): JSX.Element | null => showBackButton
            ? (
                <HeaderButton
                    image={backIcon}
                    action={backAction || NavigationActions.navigateToBack}
                    noTintColor={true}
                />
            )
            : isIos ? <View/> : null,
        headerRight: null,
        headerBackTitle: null,
        headerStyle: headerStyle != null ? headerStyle : CommonHeaderStyles.headerStyle,
        headerTitleAllowFontScaling: false,
    });
}
