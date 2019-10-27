import React, {PureComponent} from "react";
import {Image, ImageStyle, ImageURISource} from "react-native";
import {styleSheetCreate} from "../utils";
import {Colors} from "../../core/theme";

interface IProps {
    imageSource: ImageURISource;
    isFocused: boolean;
}

export class TabBarIcon extends PureComponent<IProps> {
    render(): JSX.Element {
        const {isFocused, imageSource} = this.props;

        return (
            <Image
                resizeMode="stretch"
                style={isFocused ? styles.image : styles.activeImage}
                source={imageSource}
                defaultSource={imageSource}
            />
        );
    }
}

const styles = styleSheetCreate({
    image: {
        height: 27,
        width: 27,
        resizeMode: "contain",
        tintColor: Colors.black,
    } as ImageStyle,
    activeImage: {
        height: 27,
        width: 27,
        resizeMode: "contain",
        tintColor: Colors.black,
    } as ImageStyle,
});
