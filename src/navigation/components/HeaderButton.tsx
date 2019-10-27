import React from "react";
import {Image, ImageStyle, ImageURISource, TouchableOpacity, ViewStyle, Text, TextStyle, View} from "react-native";
import {Dispatch} from "redux";
import {styleSheetCreate} from "../../common/utils";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {Colors, Fonts} from "../../core/theme";

interface IProps {
    image?: ImageURISource;
    title?: string;
    action?: () => any;
    onPress?: () => void;
    noTintColor?: boolean;
}

interface IDispatchProps {
    dispatch: Dispatch;
}

@connectAdv(null, dispatch => ({dispatch}))
export class HeaderButton extends BaseReduxComponent<IEmpty, IDispatchProps, IEmpty, IProps> {
    constructor(props: IProps) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.renderButtonContent = this.renderButtonContent.bind(this);
    }

    render(): JSX.Element {
        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress} activeOpacity={0.7}>
                {this.renderButtonContent()}
            </TouchableOpacity>
        );
    }

    private renderButtonContent(): JSX.Element {
        const {noTintColor, image, title} = this.props;

        if (title != null) {
            return <Text style={styles.title} numberOfLines={1}>{title}</Text>;
        } else if (image != null) {
            return <Image style={noTintColor ? styles.image : styles.imageTintColor} source={image}/>;
        } else {
            return <View/>;
        }
    }

    private onPress(): void {
        this.props.action && this.dispatchProps.dispatch(this.props.action());
        this.props.onPress && this.props.onPress();
    }
}

const styles = styleSheetCreate({
    container: {
        minWidth: 50,
        minHeight: 39,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    } as ViewStyle,
    image: {
        resizeMode: "center",
    } as ImageStyle,
    imageTintColor: {
        tintColor: Colors.white,
        resizeMode: "center",
    } as ImageStyle,
    title: {
        fontSize: 11,
        fontFamily: Fonts.regular,
        color: Colors.black,
    } as TextStyle,
});