import React, {PureComponent} from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Easing,
    TouchableWithoutFeedback,
} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetFlatten} from "../utils";

interface IProps {
    id: string;
    index: number;
    cofeeId: string;
    name: string;
    price: number;
    favorite: boolean;
    imagePath?: string;
    SetFavorite: (productId: string) => void;
    navigate: (id: string) => void;
}

export class Drink extends PureComponent<IProps> {
    state = {
        removeAnim: new Animated.Value(1),
    }

    render(): JSX.Element {
        const {name, price, imagePath, favorite, index} = this.props;
        console.log(imagePath);
        const favoriteIcon: JSX.Element = favorite ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
                                                   : <Image source={require("../../../resources/images/icon_heart_gray.png")}/>;

        return (
            <TouchableWithoutFeedback onPress={this.gotoDrinkPage}>
                <View style={styles.container}>
                    <View style={styleSheetFlatten(styles.innerContainer, (index % 2) ? styles.marginOdd : styles.marginEven )}>
                        <Text style={styles.nameDrink}>{name}</Text>
                        <Text style={styles.description}>кофейный напиток</Text>
                        <Image
                            style={styles.image}
                            source={{uri: imagePath }}
                        />
                        <View style={styles.containerRow}>
                            <Text style={styles.price}>{price} P</Text>
                            <Animated.View
                                style={{ transform: [{ scale: this.state.removeAnim.interpolate({ inputRange: [1, 2, 3, 4, 5], outputRange: [1, 1.4, 1, 1.4, 1]})}]}}
                            >
                                <TouchableOpacity onPress={this.imageClickHandler}>
                                    {favoriteIcon}
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    private imageClickHandler = async (): Promise<void> => {
        await this.props.SetFavorite(this.props.id);
        console.log("анимация");
        Animated.timing(this.state.removeAnim, {
            toValue: 5,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => { this.setState({removeAnim: new Animated.Value(1)});});

    };
    private gotoDrinkPage = (): void => {
        this.props.navigate(this.props.id);
    };
}

const styles = StyleSheet.create({
    container: {
        width: "50%",
        height: 225,
        paddingVertical: 5,
    },
    innerContainer: {
        flex: 1,
        padding: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 7,
            height: 7,
        },
        shadowOpacity: 1.0,
        elevation: 7,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
    },
    nameDrink: {
        fontSize: 16,
        color: Colors.gray,
        fontFamily: Fonts.bold,
        fontWeight: "bold",
    },
    description: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.gray,
    },
    image: {
        flex: 1,
        maxWidth: "100%",
        resizeMode: "contain",
        alignSelf: "stretch",
        marginTop: 15,
        marginBottom: 5,
    },
    containerRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    marginEven: {
        marginHorizontal: 10,
    },
    marginOdd: {
        marginRight: 10,
        marginLeft: 0,
    },
    price: {
        color: Colors.green,
        fontSize: 24,
        fontFamily: Fonts.lobster,
    }});
