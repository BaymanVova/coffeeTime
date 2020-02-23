import React, {PureComponent} from "react";
import {View, Text, Image, ViewStyle, ImageStyle, TextStyle, TouchableOpacity} from "react-native";
import {styleSheetCreate} from "../utils";
import {Colors, Fonts} from "../../core/theme";
import {localization} from "../localization/localization";

interface ICafeProps {
    id?: string;
    name: string;
    address: string;
    coordinates: string;
    description: string;
    images?: string;
    onPress?: any;
}

export class Cafe extends PureComponent<ICafeProps> {

    private navigateToCafeInfo = (): void => {
        this.props.onPress(this.props.id);
    }

    render(): JSX.Element {
        const { name, address, images} = this.props;

        return (
            <View style={styles.container} >
                <View style={styles.boxWithImage}>
                    <Image
                        style={styles.image}
                        source={{uri: images }}
                    />
                    </View>
                <View style={styles.description}>
                    <Text style={styles.title}>{name}</Text>
                    <Text style={styles.findUs}>{localization.common.weLocate}</Text>
                    <Text style={styles.address}>{address}</Text>
                    <TouchableOpacity onPress={this.navigateToCafeInfo}>
                        <Text style={styles.detail}>{localization.common.detail}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = styleSheetCreate({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.white,
        marginBottom: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 3,
            height: 3,
        },
        elevation: 5,
    } as ViewStyle,
    boxWithImage: {
        justifyContent: "center",
        flex: 1,
        flexDirection: "row",
    } as ViewStyle,
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        resizeMode: "contain",
        alignSelf: "stretch",
    } as ImageStyle,
    description: {
        flex: 2,
        flexDirection: "column",
        margin: 10,
    } as ViewStyle,
    title: {
        color: Colors.green,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: Fonts.bold,
        marginTop: 10,
        marginBottom: 10,
    } as TextStyle,
    detail: {
        color: Colors.lightGray,
        textAlign: "right",
    } as TextStyle,
    address: {
        fontSize: 16,
        color: Colors.gray,
        marginBottom: 5,
    } as TextStyle,
    findUs: {
        fontSize: 14,
        color: Colors.gray,
    } as TextStyle});
