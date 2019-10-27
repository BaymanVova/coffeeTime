import React, {Fragment, PureComponent} from "react";
import {Image, ImageStyle, ImageURISource, Text, TextStyle, View, ViewStyle} from "react-native";
import {Colors, Fonts} from "../../core/theme";
import {styleSheetCreate} from "../utils";
import {ImageResources} from "../ImageResources.g";

interface IProps {
    image: ImageURISource;
    title?: string;
    subtitle?: string;
    disable?: boolean;
}

export class EmptyComponent extends PureComponent<IProps> {
    static defaultProps: Partial<IProps>;

    render(): JSX.Element | null {
        const {title, subtitle, image, disable} = this.props;
        let content = null;

        if (!disable) {
            content = (
                <Fragment>
                    <Image style={styles.image} source={image!}/>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                </Fragment>
            );
        }

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

EmptyComponent.defaultProps = {
    image: ImageResources.image_back,
    title: "No title",
    subtitle: "No subtitle",
};

const styles = styleSheetCreate({
    container: {
        flex: 1,
        backgroundColor: Colors.white88,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 13,
    } as ViewStyle,
    image: {
        width: 147,
        height: 147,
        resizeMode: "contain",
    } as ImageStyle,
    title: {
        paddingTop: 8,
        fontSize: 14,
        fontFamily: Fonts.regular,
        lineHeight: 20,
        color: Colors.black,
        textAlign: "center",
    } as TextStyle,
    subtitle: {
        fontSize: 18,
        fontFamily: Fonts.regular,
        lineHeight: 22,
        color: Colors.black,
        textAlign: "center",
    } as TextStyle,
});
