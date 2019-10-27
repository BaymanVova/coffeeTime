import {BaseReduxComponent} from "../../core/BaseComponent";
import {LoadingView} from "./LoadingView";
import React from "react";
import {IAppState} from "../../core/store/appState";
import {connectAdv} from "../../core/store";
import {Modal} from "react-native";

interface IStateProps {
    isLoading: boolean;
}

@connectAdv((state: IAppState): IStateProps => ({
    isLoading: false,
}))
export class LoadingModal extends BaseReduxComponent<IStateProps, IEmpty> {
    render(): JSX.Element {
        return (
            <Modal
                animationType={"none"}
                visible={this.stateProps.isLoading}
                onRequestClose={this.onRequestClose}
                transparent={true}
            >
                <LoadingView isLoading={true} transparent={false}/>
            </Modal>
        );
    }

    onRequestClose = (): void => {
        console.log();
    };
}