import React, {PureComponent} from "react";
import {Text, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../../utils";
import {Colors} from "../../../core/theme";

interface IProps {
    click: () => void;
    styles?: any;
    disabled?: boolean;
}

export class RoundButton extends PureComponent<IProps> {
    render(): JSX.Element {
        return (
            <TouchableOpacity onPress={this.props.click} style={styleSheetFlatten(styles.button, this.props.styles)} disabled={this.props.disabled}>
                <Text style={styles.text}>
                   {this.props.children}
                </Text>
            </TouchableOpacity>
        );
    }
}

const styles = styleSheetCreate({
    button: {
        width: "80%",
        backgroundColor: Colors.green,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        marginBottom: 20,
    } as ViewStyle,
    text: {
        fontSize: 18,
        color: Colors.white,
        textTransform: "uppercase",
    } as TextStyle,
})
