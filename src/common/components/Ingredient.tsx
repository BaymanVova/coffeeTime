import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {Colors, Fonts} from "../../core/theme";

interface IProp {
    id: string;
    description: string;
    iconType: string;
}

export class Ingredient extends PureComponent<IProp> {
    render(): JSX.Element {
        const {description, iconType} = this.props;
        let iconImage: JSX.Element =  <Image style={styles.iconImage} source={require("../../../resources/images/milk.png")}/>;
        let iconColor: string = "";
        //TODO: Слишком сложная логика (по сути все if'ы проходятся), и она не должна происходить
        // в рендере, нужно вынесли в отдельный метод для получения изображения и цвета при помощи switch/case
        if (iconType === "milk") {
            iconImage =   <Image style={styles.iconImage} source={require("../../../resources/images/milk.png")}/>;
            iconColor = Colors.milkOval;
        }
        if (iconType === "coffee") {
            iconImage =   <Image style={styles.iconImage} source={require("../../../resources/images/coffeegrains.png")}/>;
            iconColor = Colors.coffeeOval;
        }
        if (iconType === "water") {
            iconImage =   <Image style={styles.iconImage} source={require("../../../resources/images/waterdrop.png")}/>;
            iconColor = Colors.waterOval;
        }
        if (iconType === "temperature") {
            iconImage =   <Image style={styles.iconImage} source={require("../../../resources/images/temperature.png")}/>;
            iconColor = Colors.temperatureOval;
        }

        return (
            <View style={styles.container}>
                <View style={[styles.CircleShapeView, {backgroundColor: iconColor}]}>
                    {iconImage}
                </View>
                <Text style={styles.textDescription}>{description}</Text>
            </View>
        );
    }
}

//TODO: Нужны типы для объектов
const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        margin: 8,
    },
    CircleShapeView: {
        width: 35,
        height: 35,
        borderRadius: 35,
        justifyContent: "center",
        alignItems: "center",
    },
    iconImage: {
        maxWidth: 20,
        maxHeight: 20,
        resizeMode: "contain",
    },
    textDescription: {
        fontSize: 8,
        color: Colors.darkGray,
        fontFamily: Fonts.light,
    }});
