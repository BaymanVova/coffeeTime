import {BackHandler} from "react-native";
import {Dispatch} from "redux";
import {AnyAction} from "typescript-fsa";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {getBackAction} from "../navigation";
import {NavigationStackOptions} from "react-navigation-stack";

interface IDispatchProps {
    dispatch: (action: AnyAction) => boolean;
}

@connectAdv((state: IAppState) => (state), (dispatch: Dispatch) => ({dispatch}))
export class BackButtonHandler extends BaseReduxComponent<IAppState, IDispatchProps> {
    static navigationOptions: NavigationStackOptions;

    constructor(props: any) {
        super(props);
        this.onBack = this.onBack.bind(this);
    }

    render(): JSX.Element | null {
        return null;
    }

    componentDidMount(): void {
        BackHandler.addEventListener("hardwareBackPress", this.onBack);
    }

    componentWillUnmount(): void {
        BackHandler.removeEventListener("hardwareBackPress", this.onBack);
    }

    shouldComponentUpdate(): boolean {
        return false;
    }

    private onBack(): boolean {
        const dispatch = this.dispatchProps.dispatch;
        let processed = false;

        const backAction = getBackAction(this.stateProps.navigation);

        if (backAction != null) {
            dispatch(backAction);

            processed = true;
        }

        return processed;
    }
}