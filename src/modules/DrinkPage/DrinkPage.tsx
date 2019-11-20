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
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {getParamsFromProps} from "../../common/helpers";
import {CafeAsyncActions} from "../CafePage/CafeAsyncActions";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {FavoriteIcon} from "../../common/components/FavoriteIcon";
import {localization} from "../../common/localization/localization";

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
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
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

export class DrinkPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState, IProps> {
    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});

    constructor(props: any) {
        super(props);
        this.state = {
            isFavorite : false,
        };
    }

    componentDidMount(): void {
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrink(id);
        this.setState({isFavorite: this.stateProps.drinkInfo!.favorite });
    }
    render(): JSX.Element {
        const {drinkInfo} = this.stateProps;
        if (drinkInfo) {
            //TODO: Должно быть в локалищации
            return (
                <View style={styles.container}>
                    <Image style={styles.image} source={{uri: drinkInfo.imagesPath}}/>
                    <View style={styles.description}>
                        <View style={styles.row}>
                            <Title>
                                {drinkInfo.productName}
                            </Title>
                            <FavoriteIcon
                                favorite={this.state.isFavorite}
                                setFavorite={this.setFavorite}
                            />
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
                           {localization.common.description}
                        </Text>
                        <View style={styles.order}>
                            <View style={styles.line}>
                                <Text style={styles.price}>
                                    {drinkInfo.price} P
                                </Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.textButton}>{localization.common.order}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } else {
            return (
              <View>
                  <Text>{localization.common.noInformation}</Text>
              </View>
            );
        }
    }

    private setFavorite = (): void => {
        const {id} = getParamsFromProps(this.props);
        if (!this.state.isFavorite) {
            this.setState({isFavorite: true});
            this.dispatchProps.setFavorite(id);
        } else if (this.state.isFavorite) {
            this.setState({isFavorite: false});
            this.dispatchProps.unsetFavorite(id);
        }
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
