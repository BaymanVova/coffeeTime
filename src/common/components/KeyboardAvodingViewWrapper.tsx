import React, {PureComponent, ReactNode} from "react";
import {KeyboardAvoidingView, View, ViewProps} from "react-native";
import {isDroid} from "../../core/theme";

export class KeyboardAvoidingViewWrapper extends PureComponent<ViewProps & { extraHeight?: number }> {
    render(): ReactNode {
        if (isDroid) {
            return (
                <View {...this.props}>
                    {this.props.children}
                </View>
            );
        } else {
            return (
                <KeyboardAvoidingView
                    behavior={"padding"}
                    keyboardVerticalOffset={40 + (this.props.extraHeight || 0)}
                    {...this.props}
                >
                    {this.props.children}
                </KeyboardAvoidingView>
            );
        }
    }
}