import React, {PureComponent} from "react";
import {
    View,
    Text,
    Image,
    Animated,
    TouchableWithoutFeedback, ViewStyle, TextStyle, ImageStyle,
} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {FavoriteIcon} from "./FavoriteIcon";
import {localization} from "../localization/localization";

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
interface IState {
    animationSize: Animated.Value;
}

export class Drink extends PureComponent<IProps, IState> {

    render(): JSX.Element {
        const {name, price, imagePath, favorite, index} = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.gotoDrinkPage}>
                <View style={styles.container}>
                    <View style={styleSheetFlatten(styles.innerContainer, (index % 2) ? styles.marginOdd : styles.marginEven )}>
                        <Text style={styles.nameDrink}>{name}</Text>
                        <Text style={styles.description}>{localization.common.coffeeDrink}</Text>
                        <Image
                            style={styles.image}
                            source={{uri: imagePath }}
                        />
                        <View style={styles.containerRow}>
                            <Text style={styles.price}>{price}{localization.common.currency}</Text>
                            <FavoriteIcon
                                favorite={favorite}
                                setFavorite={this.imageClickHandler}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    private imageClickHandler = (): void => {
        this.props.SetFavorite(this.props.id);
    };
    private gotoDrinkPage = (): void => {
        this.props.navigate(this.props.id);
    };
}

const styles = styleSheetCreate({
    container: {
        width: "50%",
        height: 225,
        paddingVertical: 5,
    } as ViewStyle,
    innerContainer: {
        flex: 1,
        padding: 10,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 7,
            height: 7,
        },
        elevation: 7,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
    } as ViewStyle,
    nameDrink: {
        fontSize: 16,
        color: Colors.gray,
        fontFamily: Fonts.bold,
        fontWeight: "bold",
    } as TextStyle,
    description: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: Colors.gray,
    } as TextStyle,
    image: {
        flex: 1,
        maxWidth: "100%",
        resizeMode: "contain",
        alignSelf: "stretch",
        marginTop: 15,
        marginBottom: 5,
    } as ImageStyle,
    containerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    } as ViewStyle,
    marginEven: {
        marginHorizontal: 10,
    } as ViewStyle,
    marginOdd: {
        marginRight: 10,
        marginLeft: 0,
    } as ViewStyle,
    price: {
        color: Colors.green,
        fontSize: 24,
        fontFamily: Fonts.lobster,
    } as TextStyle,
});
