import React, {PureComponent} from "react";
import {Image, ImageStyle, TextInput, TextInputProps, TextStyle, View, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../../utils";
import {Colors, Fonts} from "../../../core/theme";

//TODO: Не совсем понятно зачем папку создавать
//Не знаю, но хотел как-то разделить структуру, чтоб проще элементы находить и понятнее к чему они относятся
export class AuthInput extends PureComponent<TextInputProps> {
        render(): JSX.Element {
            return (
                <View style={styles.container}>
                    <TextInput {...this.props} style={styleSheetFlatten(styles.input, this.props.style)} />
                    <Image style={styles.image} source={require("../../../../resources/images/icon_pencil_edit.png")} />
                </View>
            );
        }
}

const styles = styleSheetCreate({
    container: {
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 30,
    } as ViewStyle,
    image: {
        marginLeft: -25,
        marginRight: 65,
        resizeMode: "stretch",
        alignItems: "center",
    } as ImageStyle,
    input: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.white,
        paddingBottom: 10,
        width: "65%",
        fontSize: 18,
        color: Colors.white,
        fontFamily: Fonts.light,
    } as TextStyle,
})
