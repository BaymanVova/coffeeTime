import React from "react";
import {View} from "react-native";
import {Cafe} from "../../common/components/Cafe";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {ListCafeAsyncActions} from "./ListCafeAsyncSctions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {PlainHeader} from "../../common/components/Headers";
import {CommonHeaderStyles, CommonStyles} from "../../core/theme/commonStyles";
import {NavigationActions} from "../../navigation/navigation";
import {FlatListWrapper} from "../../common/components/FlatListWrapper";
import {LoadState} from "../../common/loadState";
import {defaultIdExtractor} from "../../common/helpers";
import {EmptyComponent} from "../../common/components/EmptyComponent";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";

interface IStateProps {
    listCafe: ICafeResponse[] | null;
    loadState: LoadState;
    error?: string;
}

interface IDispatchProps {
    getListCafe: () => void;
    goToCafeInfo: (id: string) => void;
}
@connectAdv(
    ({listCafe}: IAppState): IStateProps => ({
        listCafe: listCafe.listCafe,
        loadState: listCafe.loadState,
        error: listCafe.error,
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        getListCafe: (): void => {
            dispatch(ListCafeAsyncActions.getListCafe());
        },
        goToCafeInfo: (id: string): void => {
            dispatch(NavigationActions.navigateToCafePage({id}));
        },
    }),
)
export class ListCafePage extends BaseReduxComponent<IStateProps, IDispatchProps, IEmpty> {
    static navigationOptions = PlainHeader({ title: "CoffeTime", headerStyle: CommonHeaderStyles.defaultHeaderStyle});

    componentDidMount(): void {
        this.dispatchProps.getListCafe();
        console.log("componentDidMount: ", this.stateProps.listCafe);
    }
    private navigateToCafeInfo = (id: string): void => {
        this.dispatchProps.goToCafeInfo(id);
    }

    render(): JSX.Element {
        const {listCafe, loadState, error} = this.stateProps;

        return (
            <View style={CommonStyles.flex1}>
                <FlatListWrapper
                    data={listCafe}
                    loadState={loadState}
                    keyExtractor={defaultIdExtractor}
                    errorText={error}
                    EmptyComponent={this.renderEmptyComponent}
                    renderItem={this.renderCafe}
                    tryAgain={this.tryAgain}
                    onRefresh={this.tryAgain}
                    loadMore={this.tryAgain}
                />
            </View>
        );
    }

    private  renderCafe = ({item}: {item: ICafeResponse}): JSX.Element => {
        return (
            <Cafe
                id={item.id}
                name={item.name}
                address={item.address}
                coordinates={item.coordinates}
                description={item.description}
                images={item.images}
                key={item.id}
                onPress={this.navigateToCafeInfo}
            />
        );
    }

    private tryAgain = (): void => {
        this.dispatchProps.getListCafe();
    }

    private renderEmptyComponent = (): JSX.Element => {
        return (
            <EmptyComponent
                title={"Список пуск"}
            />
        );
    };
}
