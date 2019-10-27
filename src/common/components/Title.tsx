import React, {PureComponent} from "react";
import {Text, TextInputProps, TextStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {Colors, Fonts} from "../../core/theme";

export class Title extends PureComponent<TextInputProps> {
    render(): JSX.Element {
        return (
            <Text style={styleSheetFlatten(styles.title, this.props.style)}>{this.props.children}</Text>
        );
    }
}
const styles = styleSheetCreate({
    title: {
        fontFamily: Fonts.lobster,
        color: Colors.darkGray,
        fontSize: 28,
        marginBottom: 5,
    } as TextStyle});
