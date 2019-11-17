import React from "react";
import {Animated, Easing, Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle} from "react-native";
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
interface IState {
    isFavorite: boolean;
    removeAnim: Animated.Value;
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

export class DrinkPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});

    private animatedStyle: ViewStyle;
    private transformAnimation: Animated.CompositeAnimation;

    //TODO: Почему здесь IStateProps?
    constructor(props: IStateProps) {
        super(props);
        this.state = {
            removeAnim: new Animated.Value(1),
            isFavorite : false,
        };
        this.animatedStyle = {
            transform: [ {
                scale: this.state.removeAnim.interpolate({ inputRange: [1, 2, 3, 4, 5], outputRange: [1, 1.4, 1, 1.4, 1]})}] as any };
        this.transformAnimation = Animated.timing(this.state.removeAnim, {
            toValue: 5,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    }

    componentDidMount(): void {
        //TODO: Избавиться от ts-ignore и ненужных консолей
        //TODO: this.stateProps.drinkInfo! таким образом ты упадешь
        //@ts-ignore
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrink(id);
        console.log("favarite", this.stateProps.drinkInfo!.favarite );
        console.log("favarite2", this.stateProps );
        this.setState({isFavorite: this.stateProps.drinkInfo!.favarite });
        console.log("favarite3",  this.state.isFavorite);
    }
    render(): JSX.Element {
        console.log("RENDER", this.state.isFavorite);
        const {drinkInfo} = this.stateProps;
        //TODO: Работу с FavoriteIcon можно было бы вынести в отдельный компонент, уже несколько раз встречается
        const favoriteIcon: JSX.Element | null = drinkInfo ? this.state.isFavorite ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
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
                            <Animated.View style={this.animatedStyle}>
                                <TouchableOpacity style={styles.hearthButton} onPress={() => this.setFavorite(drinkInfo.id)}>
                                    {favoriteIcon}
                                </TouchableOpacity>
                            </Animated.View>
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
                        //TODO: Должно быть в локалищации
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
        Animated.sequence([
            this.transformAnimation,
        ]).start(() => { this.setState({removeAnim: new Animated.Value(1)}); });
        if (!this.state.isFavorite) {
            this.setState({isFavorite: true});
            await this.dispatchProps.setFavorite(drinkId);
        } else if (this.state.isFavorite) {
            this.setState({isFavorite: false});
            await this.dispatchProps.unsetFavorite(drinkId);
        }
        //@ts-ignore
       // const {id} = getParamsFromProps(this.props);
        //await this.dispatchProps.getDrink(id);
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
