import React from "react";
import {
    Animated,
    Easing,
    Image,
    ImageBackground,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import {Title} from "../../common/components/Title";
import {styleSheetCreate} from "../../common/utils";
import {Colors, CommonStyles, windowHeight} from "../../core/theme";
import LinearGradient from "react-native-linear-gradient";
import {defaultIdExtractor, getParamsFromProps} from "../../common/helpers";
import {ICafeInfo, IProductBriefInfo} from "../../core/api/generated/CoffeeReqiest";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {CafeAsyncActions} from "./CafeAsyncActions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {Drink} from "../../common/components/Drink";
import {PlainHeader} from "../../common/components/Headers";
import {CommonHeaderStyles} from "../../core/theme/commonStyles";
import {LoadState} from "../../common/loadState";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {NavigationActions} from "../../navigation/navigation";

interface IStateProps {
    loadState: LoadState;
    error: string;
    cafeInfo: ICafeInfo;
    listDrinks: IProductBriefInfo[] | [];
}

interface IDispatchProps {
    getInfo: (id: string) => void;
    getDrinks: (id: string) => void;
    setFavorite: (id: string) => void;
    unsetFavorite: (id: string) => void;
    gotoDrinkInfo: (id: string) => void;
}

@connectAdv(
    ({cafeInfo}: IAppState): IStateProps => ({
        loadState: cafeInfo.loadState,
        error: cafeInfo.error,
        cafeInfo: cafeInfo.cafeInfo || {name: "", address: "", coordinates: "", description: ""},
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

export class CafePage extends BaseReduxComponent<IStateProps, IDispatchProps, IEmpty> {

    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});
    state = {
        removeAnim: new Animated.Value(1),
        favorite: false,
        allCafe: null,
    };

    componentDidMount(): void {
        //@ts-ignore
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getInfo(id);
        this.dispatchProps.getDrinks(id);
    }

    render(): JSX.Element {
        const {loadState, listDrinks, error} = this.stateProps
        if (this.stateProps.cafeInfo != null) {
            return (
                <View style={CommonStyles.flex1}>
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
                </View>
            );
        } else {
            return <View/>;
        }

    }

    private setFavoriteDrink = (drinkId: string): void => {
        const drink = this.stateProps.listDrinks.find(_ => _.id == drinkId);
        if (drink) {
            if (drink.favorite) {
                this.dispatchProps.unsetFavorite(drinkId);
                console.log("unsetFavorite");
            } else {
                this.dispatchProps.setFavorite(drinkId);
                console.log("setFavorite");
            }
        }
        this.tryAgain();
    };

    private gotoDrinkPage = (id: string): void => {
        this.dispatchProps.gotoDrinkInfo(id);
    }

    private renderListHeader = (): JSX.Element => {
        const {cafeInfo} = this.stateProps;
        const favoriteIcon: JSX.Element = this.state.favorite ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
            : <Image source={require("../../../resources/images/icon_heart_gray.png")}/>;

        return (
            <ImageBackground style={styles.container} source={{uri: cafeInfo.images}}>
                <LinearGradient
                    colors={["transparent", "transparent", "#F7ECDA"]}
                    locations={[0, 0.4, 1]}
                    style={styles.linearGradient}
                >
                    <View style={styles.background}>
                        <Title>{cafeInfo.name}</Title>
                        <View style={styles.containerRow}>
                            <Text style={styles.address}>{cafeInfo.address}</Text>
                            <Animated.View
                                style={
                                    { transform: [
                                            { scale: this.state.removeAnim.interpolate(
                                                    { inputRange: [1, 2, 3, 4, 5], outputRange: [1, 1.4, 1, 1.4, 1]})}]}}
                            >
                                <TouchableOpacity onPress={this.imageClickHandler}>
                                    {favoriteIcon}
                                </TouchableOpacity>
                            </Animated.View>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }

    private renderDrink = ({item, index }: {item: IProductBriefInfo, index: number}): JSX.Element => {
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
        return (
            <EmptyComponent title={"Список напитков пуст"}/>
        );
    }

    private tryAgain = (): void => {
        //@ts-ignore
        const {id} = getParamsFromProps(this.props);
        this.dispatchProps.getDrinks(id);
    }

    private imageClickHandler = (): void => {
        //@ts-ignore
        this.setState({favorite: !this.state.favorite});
        Animated.timing(this.state.removeAnim, {
            toValue: 5,
            duration: 800,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start(() => { this.setState({removeAnim: new Animated.Value(1)});});
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
    }});
