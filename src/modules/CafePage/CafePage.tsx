import React from "react";
import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    Text,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import {Title} from "../../common/components/Title";
import {styleSheetCreate} from "../../common/utils";
import {Colors, windowHeight} from "../../core/theme";
import LinearGradient from "react-native-linear-gradient";
import {defaultIdExtractor, getParamsFromProps} from "../../common/helpers";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {CafeAsyncActions} from "./CafeAsyncActions";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {Drink} from "../../common/components/Drink";
import {PlainHeader} from "../../common/components/Headers";
import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import {LoadState} from "../../common/loadState";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {NavigationActions} from "../../navigation/navigation";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";
import {NavigationAction, NavigationLeafRoute, NavigationScreenProp} from "react-navigation";
import {ICommonNavParams} from "../../navigation/actions";
import {IProductBriefInfoResponse} from "../../core/api/generated/dto/ProductBriefInfoResponse.g";
import {localization} from "../../common/localization/localization";

interface IState {
    animation: Animated.Value;
    isFiltered: boolean;
}
interface IStateProps {
    loadState: LoadState;
    error: string;
    cafeInfo: ICafeResponse;
    listDrinks: IProductBriefInfoResponse[] | [];
}

interface IProps extends IReduxProps<IStateProps, IEmpty> {
    navigation: NavigationScreenProp<NavigationLeafRoute<ICommonNavParams>, NavigationAction>;
}

interface IDispatchProps {
    getInfo: (id: string) => void;
    getDrinks: (id: string) => void;
    setFavorite: (id: string) => void;
    unsetFavorite: (id: string) => void;
    gotoDrinkInfo: (id: string) => void;
}

/*
TODO: cafeInfo не должно иметь в этом случае ИЛИ, если нет кафе то значит мы что-то не так сделали
 и должны или падать или показывать оишбку пользователю
*/
@connectAdv(
    ({cafeInfo}: IAppState): IStateProps => ({
        loadState: cafeInfo.loadState,
        error: cafeInfo.error,
        cafeInfo: cafeInfo.cafeInfo!,
        listDrinks: cafeInfo.listDrinks,
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        getInfo: (id: string): void => {
            dispatch(CafeAsyncActions.getCafeInfo(id));
        },
        getDrinks: (id: string): void => {
            dispatch(CafeAsyncActions.getListDrink(id));
        },
        setFavorite: (id: string): void => {
            dispatch((CafeAsyncActions.setFavorite(id)));
        },
        unsetFavorite: (id: string): void => {
            dispatch((CafeAsyncActions.unsetFavorite(id)));
        },
        gotoDrinkInfo: (id: string): void => {
            dispatch(NavigationActions.navigateToDrink({id}));
        },
    }),
)

export class CafePage extends BaseReduxComponent<IStateProps, IDispatchProps, IState, IProps> {

    private animatedStyle: ViewStyle;
    private transformForwardAnimation: Animated.CompositeAnimation;
    private transformBackAnimation: Animated.CompositeAnimation;

    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});
    //TODO: какой тут тип у пропсов указывать?
    constructor(props: any) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
            isFiltered: false,
        };
        this.animatedStyle = { transform: [{translateX: this.state.animation}] as any };
        this.transformForwardAnimation = Animated.timing(this.state.animation, {
            toValue: 30,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        this.transformBackAnimation = Animated.timing(this.state.animation, {
            toValue: 0,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    }

    componentDidMount(): void {
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getInfo(id);
        this.dispatchProps.getDrinks(id);
    }

    render(): JSX.Element {
        const {loadState, listDrinks, error} = this.stateProps;

            return (
                    <View style={styles.listDrinks}>
                        <FlatListWrapper
                            data={listDrinks}
                            loadState={loadState}
                            keyExtractor={defaultIdExtractor}
                            errorText={error}
                            EmptyComponent={this.renderEmptyComponent}
                            ListHeaderComponent={this.renderListHeader}
                            renderItem={this.renderDrink}
                            tryAgain={this.tryAgain}
                            onRefresh={this.tryAgain}
                            loadMore={this.tryAgain}
                            numColumns={2}
                        />
                    </View>
            );
    }

    private setFavoriteDrink = async (drinkId: string): Promise<void> => {
        const drink = this.stateProps.listDrinks.find(_ => _.id == drinkId);
        if (drink) {
            if (drink.favorite) {
                await this.dispatchProps.unsetFavorite(drinkId);
            } else {
                await this.dispatchProps.setFavorite(drinkId);
            }
        }
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrinks(id);
    };

    private gotoDrinkPage = (id: string): void => {
        this.dispatchProps.gotoDrinkInfo(id);
    };

    private gradientColor = [Colors.transparent, Colors.transparent, Colors.waterOval];
    private gradientLocation = [0, 0.4, 1];

    private renderListHeader = (): JSX.Element => {
        const {cafeInfo} = this.stateProps;
        const filterIcon: JSX.Element = this.state.isFiltered ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
        : <Image source={require("../../../resources/images/icon_heart_gray.png")}/>;

        return (
            <ImageBackground style={styles.container} source={{uri: cafeInfo.images}}>

                <LinearGradient
                    colors={this.gradientColor}
                    locations={this.gradientLocation}
                    style={styles.linearGradient}
                >
                    <View style={styles.background}>
                        <Title>{cafeInfo.name}</Title>
                        <View style={styles.containerRow}>
                            <Text style={styles.address}>{cafeInfo.address}</Text>
                            <TouchableWithoutFeedback onPress={this.imageClickHandler}>
                                <View style={styles.checkBox}>
                                    <Animated.View style={this.animatedStyle}>
                                            {filterIcon}
                                    </Animated.View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }

    //TODO: Можно упростить тип, ведь index тебе не нужен здесь
    // Индекс нужен, чтоб узнать справа или слева находится карточка напитка, чтоб везде был одинаковый отступ.
    private renderDrink = ({item, index }: {item: IProductBriefInfoResponse, index: number}): JSX.Element => {
        return (
                <Drink
                    id={item.id}
                    index={index}
                    cofeeId={item.cofeId}
                    name={item.name}
                    price={item.price}
                    favorite={item.favorite}
                    imagePath={item.imagesPath}
                    key={item.id}
                    SetFavorite={this.setFavoriteDrink}
                    navigate={this.gotoDrinkPage}
                />
        );
    }

    private renderEmptyComponent = (): JSX.Element => {
        return <EmptyComponent title={localization.common.emptyDrinkList}/>;
    }

    private tryAgain = (): void => {
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrinks(id);
    }

    private imageClickHandler = (): void => {
        if (!this.state.isFiltered) {
            this.transformForwardAnimation.start();
        } else {
            this.transformBackAnimation.start();
        }
        if (!this.state.isFiltered) {
            this.stateProps.listDrinks = this.stateProps.listDrinks.filter(_ => _.favorite);
        } else {
            const {id} = getParamsFromProps(this.props);
            this.dispatchProps.getDrinks(id);
        }
        this.setState((prevstate) => ({ isFiltered: !prevstate.isFiltered }));
    };

}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        marginBottom: 5,
        marginHorizontal: -5,
        height: windowHeight * 0.5,
    } as ViewStyle,
    background: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 10,
    } as ViewStyle,
    address: {
        fontSize: 18,
        color: Colors.darkGray,
    } as TextStyle,
    containerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }as ViewStyle,
    listDrinks: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    } as ViewStyle,
    linearGradient: {
        flex: 1,
    } as ViewStyle,
    checkBox: {
        backgroundColor: Colors.white,
        borderRadius: 20,
        width: 50,
        height: 18,
    } as ViewStyle,
});
