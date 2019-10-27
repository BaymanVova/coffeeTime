import React, {PureComponent} from "react";
import {View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../../common/utils";
import {Colors} from "../../core/theme";
import { HeaderProps } from "react-navigation-stack/lib/typescript/types";
import { Header } from "react-navigation-stack";

export class HeaderWrapper extends PureComponent<HeaderProps> {
    render(): JSX.Element {
        return (
            <View style={styles.container}>
                <Header {...this.props as any}/>
            </View>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        backgroundColor: Colors.black,
        overflow: "hidden",
    } as ViewStyle,
});