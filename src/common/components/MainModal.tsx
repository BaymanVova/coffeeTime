import React, {PureComponent} from "react";
import {ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import Modal from "react-native-modal";
import {Colors, isIos} from "../../core/theme";

interface IProps {
    isVisible: boolean;
    closeModal: () => void;
    animationIn?: string;
    animationOut?: string;
    style?: ViewStyle;
}

export class MainModal extends PureComponent<IProps> {
    render(): JSX.Element {
        const {closeModal, isVisible, children, animationIn, animationOut, style} = this.props;

        return (
            <Modal
                style={styleSheetFlatten(styles.container, style)}
                animationIn={animationIn != null ? (animationIn as any) : isIos ? "slideInUp" : "fadeIn"}
                animationOut={animationOut != null ? (animationOut as any) : isIos ? "slideOutDown" : "fadeOut"}
                coverScreen={true}
                hasBackdrop={true}
                backdropColor={Colors.black}
                backdropOpacity={0.5}
                isVisible={isVisible}
                onBackButtonPress={closeModal}
                onBackdropPress={closeModal}
                useNativeDriver={!isIos}
                backdropTransitionOutTiming={0}
            >
                {children}
            </Modal>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        margin: 0,
    } as ViewStyle,
});