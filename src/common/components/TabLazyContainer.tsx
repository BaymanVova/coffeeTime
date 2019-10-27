import React from "react";
import {LayoutAnimation, View} from "react-native";
import {BaseReduxComponent, IReduxProps} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {assertNotNull} from "../assertNotNull";
import {afterTick} from "../utils";
import {CommonStyles, isIos} from "../../core/theme";

type IProps = IReduxProps<IStateProps, IEmpty, IOwnProps>;

interface IOwnProps {
    tab: string;
    children: JSX.Element | JSX.Element[] | null;
}

interface IStateProps {
    isActive: boolean;
}

interface IState {
    isContentVisible: boolean;
}

@connectAdv(
    (state: IAppState, props: IOwnProps): IStateProps => (
        {
            isActive: true, //state.navigation.tabs.routes[state.navigation.tabs.index].routeName == props.tab
        }
    ),
)
export class TabLazyContainer extends BaseReduxComponent<IStateProps, IEmpty, IState, IOwnProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {isContentVisible: this.stateProps.isActive};
    }

    componentWillReceiveProps(nextProps: IProps): void {
        const nextStateProps = assertNotNull(nextProps.stateProps);

        if (!this.state.isContentVisible && nextStateProps.isActive && !this.stateProps.isActive) {
            afterTick(() => {
                if (isIos) {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                }
                this.setState({isContentVisible: true});
            });
        }
    }

    render(): JSX.Element | JSX.Element[] | null {
        return this.state.isContentVisible ?  this.props.children : <View style={CommonStyles.flexWhiteBackground}/>;
    }
}