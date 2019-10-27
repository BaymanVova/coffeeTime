import _ from "lodash";
import React, {Component} from "react";
import {SectionList, SectionListProps, View, ViewStyle} from "react-native";
import {itemLayoutCache, ItemLayoutName} from "../../core/itemLayoutCache";
import {defaultIdExtractor} from "../helpers";
import {LoadState} from "../loadState";
import {LoadingView} from "./LoadingView";
import {TryAgain} from "./TryAgain";
import {Colors, CommonStyles} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {localization} from "../localization/localization";

interface IState {
    isRefreshing: boolean;
}

interface IProps extends SectionListProps<any> {
    loadState: LoadState;
    itemLayoutName?: ItemLayoutName;
    tryAgain: () => void;
    loadMore?: () => void;
    errorText?: string | null;
    EmptyComponent?: () => JSX.Element;
    PreloadingComponent?: () => JSX.Element;
    sectionListRef?: React.RefObject<any>;
    transparentLoading?: boolean;
    offHideList?: boolean;
}

export class SectionListWrapper extends Component<IProps, IState> {
    static defaultProps: Partial<IProps>;
    private timerId: number | null;

    constructor(props: IProps) {
        super(props);
        this.onRefresh = this.onRefresh.bind(this);
        this.state = {isRefreshing: false};
    }

    componentWillUnmount(): void {
        if (this.timerId != null) {
            clearInterval(this.timerId);
        }
    }

    render(): JSX.Element {
        let content: JSX.Element | null;

        const {loadState, itemLayoutName, sections, loadMore, errorText, PreloadingComponent, EmptyComponent, offHideList} = this.props;
        if (!_.values(sections).some(item => item.data.length > 0) && !offHideList) {
            if (loadState == LoadState.firstLoad || loadState == LoadState.needLoad) {
                content = PreloadingComponent != null ? PreloadingComponent() : null;
            } else if (loadState == LoadState.error) {
                content = <TryAgain onPress={this.props.tryAgain} errorText={errorText}/>;
            } else if (EmptyComponent) {
                content = EmptyComponent();
            } else {
                content = <View/>;
            }
        } else {
            const getItemLayout = itemLayoutName != null ? itemLayoutCache.get(itemLayoutName) : this.props.getItemLayout;
            const props = {...this.props};
            delete props.itemLayoutName;
            delete props.loadState;
            delete props.loadMore;
            if (props.onRefresh != null) {
                props.refreshing = loadState == LoadState.pullToRefresh || this.state.isRefreshing;
                props.onRefresh = this.onRefresh;
            }
            if (loadMore != null && loadState == LoadState.idle) {
                props.onEndReachedThreshold = 1;
                props.onEndReached = loadMore;
            }

            content = (
                <SectionList
                    style={styles.list}
                    ref={this.props.sectionListRef}
                    {...props}
                    getItemLayout={getItemLayout}
                />
            );
        }

        return (
            <View style={CommonStyles.flexWhiteBackground}>
                <LoadingView isLoading={loadState == LoadState.firstLoad} transparent={this.props.transparentLoading}/>
                {content}
            </View>
        );
    }

    private onRefresh(): void {
        this.setState({isRefreshing: true});
        this.props.onRefresh!();
        this.timerId = _.delay((): void => this.setState({isRefreshing: false}), 500);
    }
}

SectionListWrapper.defaultProps = {
    keyExtractor: defaultIdExtractor,
    errorText: localization.errors.listErrorTitle,
};

const styles = styleSheetCreate({
    list: {
        backgroundColor: Colors.white,
    } as ViewStyle,
});