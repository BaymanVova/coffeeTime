import React, {PureComponent} from "react";
import {Image, ImageStyle, View} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {CommonStyles, isIos} from "../../core/theme";
import {SplashResources} from "../ImageResources.g";
import {styleSheetCreate} from "../utils";

export class Splash extends PureComponent {
    render(): JSX.Element | null {
        if (isIos) {
            const useDefaultSource = appSettingsProvider.settings.environment != "Development" && __DEV__;

            return (
                <View style={CommonStyles.flexWhiteBackground}>
                    <Image
                        style={styles.image}
                        defaultSource={useDefaultSource ? SplashResources.splash : undefined}
                        source={SplashResources.splash}
                    />
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = styleSheetCreate({
    image: {
        alignSelf: "center",
        width: "100%",
        height: "100%",
    } as ImageStyle,
});