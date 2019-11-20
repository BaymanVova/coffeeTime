import React, {PureComponent} from "react";
import {Image, ImageStyle, Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate} from "../utils";

interface IProp {
    id: string;
    description: string;
    iconType: string;
}

export class Ingredient extends PureComponent<IProp> {
    render(): JSX.Element {
        const {description} = this.props;

        return (
            <View style={styles.container}>
                {this.iconImage()}
                <Text style={styles.textDescription}>{description}</Text>
            </View>
        );
    }
    private iconImage = (): JSX.Element  => {
        const {iconType} = this.props;
        let image: JSX.Element;
        let iconColor: string;
        switch (iconType) {
            case "milk":
                image =   <Image style={styles.iconImage} source={require("../../../resources/images/milk.png")}/>;
                iconColor = Colors.milkOval;
                break;
            case "coffee":
                image =   <Image style={styles.iconImage} source={require("../../../resources/images/coffeegrains.png")}/>;
                iconColor = Colors.coffeeOval;
                break;
            case "water":
                image =   <Image style={styles.iconImage} source={require("../../../resources/images/waterdrop.png")}/>;
                iconColor = Colors.waterOval;
                break;
            case "temperature":
                image =   <Image style={styles.iconImage} source={require("../../../resources/images/temperature.png")}/>;
                iconColor = Colors.temperatureOval;
                break;
            default:
                image = <></>;
                iconColor = Colors.transparent;
                break;
        }

        return (
            <View style={[styles.CircleShapeView, {backgroundColor: iconColor}]}>
                {image}
            </View>
        );
    };
}

const styles = styleSheetCreate({
    container: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    } as ViewStyle,
    CircleShapeView: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    } as ViewStyle,
    iconImage: {
        maxWidth: 20,
        maxHeight: 20,
        resizeMode: "contain",
    } as ImageStyle,
    textDescription: {
        fontSize: 8,
        color: Colors.darkGray,
        fontFamily: Fonts.light,
    } as TextStyle,
});
