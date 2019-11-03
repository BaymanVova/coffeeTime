import React from "react";
import {Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
import {Title} from "../../common/components/Title";
import {styleSheetCreate} from "../../common/utils";
import {Colors, Fonts, windowHeight} from "../../core/theme";
import {Ingredient} from "../../common/components/Ingredient";
import {PlainHeader} from "../../common/components/Headers";
import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import {LoadState} from "../../common/loadState";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {DrinkAsyncAction} from "./DrinkAsyncAction";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {getParamsFromProps} from "../../common/helpers";
import {CafeAsyncActions} from "../CafePage/CafeAsyncActions";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

interface IStateProps {
    loadState: LoadState;
    error: string;
    drinkInfo: IProductFullInfoResponse | null;
}

interface IDispatchProps {
    getDrink: (productId: string) => void;
    setFavorite: (id: string) => void;
    unsetFavorite: (id: string) => void;
}

@connectAdv(
    ({drinkInfo}: IAppState): IStateProps => ({
        loadState: drinkInfo.loadState,
        error: drinkInfo.error,
        drinkInfo: drinkInfo.drinkInfo,
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        getDrink: (productId: string): void => {
            dispatch(DrinkAsyncAction.getDrink(productId));
        },
        setFavorite: (id: string): void => {
            dispatch(CafeAsyncActions.setFavorite(id));
        },
        unsetFavorite: (id: string): void => {
            dispatch(CafeAsyncActions.unsetFavorite(id));
        },
    }),
)

export class DrinkPage extends BaseReduxComponent<IStateProps, IDispatchProps> {
    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});

    componentDidMount(): void {
        //@ts-ignore
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrink(id);
    }
    render(): JSX.Element {
        console.log("RENDER");
        const {drinkInfo} = this.stateProps;
        const favoriteIcon: JSX.Element | null = drinkInfo ? drinkInfo.favarite ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
            : <Image source={require("../../../resources/images/icon_heart_gray.png")}/> : null;
        if (drinkInfo) {
            return (
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: drinkInfo.imagesPath}}/>
                    <View style={styles.description}>
                        <View style={styles.row}>
                            <Title>
                                {drinkInfo.productName}
                            </Title>
                            <TouchableOpacity style={styles.hearthButton} onPress={ () => this.setFavorite(drinkInfo.id)}>
                                {favoriteIcon}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.ingredients}>
                            <Ingredient
                                id={"1"}
                                description={"15мл"}
                                iconType={"milk"}
                            />
                            <Ingredient
                                id={"1"}
                                description={"25%"}
                                iconType={"coffee"}
                            />
                            <Ingredient
                                id={"1"}
                                description={"25мл"}
                                iconType={"water"}
                            />
                            <Ingredient
                                id={"1"}
                                description={"95*"}
                                iconType={"temperature"}
                            />
                        </View>
                        <Text style={styles.text}>
                            Здесь могло быть описание напитка, но почему-то сервер его не возвращает,
                            а в макете он есть,
                            поэтому <Text style={{textDecorationLine: "line-through"}}>всегда</Text> пока
                            вы будете видеть этот текст.
                        </Text>
                        <View style={styles.order}>
                            <View style={styles.line}>
                                <Text style={styles.price}>
                                    {drinkInfo.price} P
                                </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>Заказать</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
              <View>
                  <Text>Информации о напитке нет</Text>
              </View>
            );
        }
    }

    private setFavorite = async (drinkId: string): Promise<void> => {
        if (this.stateProps.drinkInfo && !this.stateProps.drinkInfo.favarite) {
            console.log("(this.stateProps.drinkInfo && this.stateProps.drinkInfo.favarite");
            this.stateProps.drinkInfo.favarite = true ;
            await this.dispatchProps.setFavorite(drinkId);
        } else if (this.stateProps.drinkInfo && this.stateProps.drinkInfo.favarite) {
            console.log("(this.stateProps.drinkInfo && !!!!!this.stateProps.drinkInfo.favarite");
            this.stateProps.drinkInfo.favarite = false ;
            await this.dispatchProps.unsetFavorite(drinkId);
        }

        //@ts-ignore
        const {id} = getParamsFromProps(this.props);
        await this.dispatchProps.getDrink(id);
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        marginHorizontal: 20,
        marginBottom: 20,
    } as ViewStyle,
    description: {
        flex: 1,
    } as ViewStyle,
    image: {
        resizeMode: "contain",
        alignSelf: "stretch",
        height: windowHeight * 0.4,
        marginBottom: 40,
    } as ImageStyle,
    row: {
        flexDirection: "row",
    } as ViewStyle,
    ingredients: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "flex-start",
        marginTop: 5,
        marginBottom: 10,
    } as ViewStyle,
    title: {
        fontSize: 24,
    } as TextStyle,
    hearthButton: {
        marginLeft: 15,
        marginTop: 10,
    } as ViewStyle,
    text: {
        fontSize: 16,
        color: Colors.darkGray,
        fontFamily: Fonts.regular,
    } as TextStyle,
    order: {
        flex: 1,
        justifyContent: "flex-end",
    } as ViewStyle,
    line: {
        flexDirection: "row",
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: "#EAEAEA",
    } as ViewStyle,
    price: {
        flex: 1,
        fontSize: 28,
        color: Colors.gray,
        textAlign: "center",
        paddingTop: 5,
    } as TextStyle,
    button: {
        flex: 1,
        backgroundColor: Colors.green,
        paddingHorizontal: 60,
        paddingVertical: 10,
        alignItems: "center",
    } as ViewStyle,
    textButton: {
        fontFamily: Fonts.regular,
        fontSize: 20,
    } as TextStyle,
})
