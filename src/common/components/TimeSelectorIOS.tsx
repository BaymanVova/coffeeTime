import React, {PureComponent} from "react";
import {DatePickerIOS, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {styleSheetCreate} from "../utils";
import {Colors, Fonts} from "../../core/theme";
import {localization} from "../localization/localization";
import {MainModal} from "./MainModal";

interface IProps {
    closeModal: () => void;
    confirmDate: (date: Date) => void;
    isVisible: boolean;
    initialDate: Date | null;
}

interface IState {
    resultDate: Date;
}

export class TimeSelectorIOS extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {resultDate: this.props.initialDate == null ? new Date() : this.props.initialDate};
    }

    private onDateChange = (date: Date): void => this.setState({resultDate: date});

    private confirmDate = (): void => {
        this.props.confirmDate(this.state.resultDate);
        this.props.closeModal();
    };

    render(): JSX.Element {
        const {closeModal, isVisible} = this.props;
        const minimumDate = new Date();

        return (
            <MainModal isVisible={isVisible} closeModal={closeModal} style={styles.modal}>
                <View style={styles.modalContainer}>
                    <View style={styles.readyContainer}>
                        <TouchableOpacity onPress={this.confirmDate}>
                            <Text style={styles.readyText}>
                                {localization.common.ok}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <DatePickerIOS
                        date={this.state.resultDate}
                        mode="time"
                        onDateChange={this.onDateChange}
                        minimumDate={minimumDate}
                    />
                </View>
            </MainModal>
        );
    }
}

const styles = styleSheetCreate({
    modal: {
        justifyContent: "flex-end",
    } as ViewStyle,
    modalContainer: {
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundColor: Colors.white,
    } as ViewStyle,
    readyContainer: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        backgroundColor: Colors.white88,
        borderBottomColor: Colors.white88,
        borderBottomWidth: StyleSheet.hairlineWidth,
    } as ViewStyle,
    readyText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.black,
        paddingVertical: 10,
        paddingHorizontal: 10,
    } as ViewStyle,
});