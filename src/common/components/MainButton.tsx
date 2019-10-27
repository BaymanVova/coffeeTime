import React, {Fragment, PureComponent} from "react";
import {Image, ImageStyle, ImageURISource, Text, TextStyle, TouchableHighlightProps, TouchableOpacity, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../utils";
import {Colors, Fonts} from "../../core/theme";
import {ButtonType} from "../enums/buttonType";

interface IProps extends TouchableHighlightProps {
  type: ButtonType;

  title?: string;
  icon?: ImageURISource;

  iconStyle?: ImageStyle;
  titleStyle?: TextStyle;
  children?: JSX.Element | JSX.Element[] | null;
  native?: boolean;
}

export class MainButton extends PureComponent<IProps> {
  render(): JSX.Element {
    const {type, style, native, ...props} = this.props;
    const styles = this.getStyle(type);

    return (
      <TouchableOpacity {...props} style={styleSheetFlatten(styles.container, style)}>
        {this.getContent(styles.title, styles.icon)}
      </TouchableOpacity>
    );
  }

  private getStyle = (type: ButtonType): {container: ViewStyle, title: TextStyle, icon: ImageStyle} => {
    switch (type) {
      case ButtonType.Negative:
        return negativeStyles;
      case ButtonType.Positive:
        return positiveStyles;
      case ButtonType.Action:
        return actionStyles;
      case ButtonType.Transparent:
        return transparentStyles;
      case ButtonType.Border:
        return borderStyles;
      case ButtonType.Neutral:
        return neutralStyles;
      case ButtonType.Green:
        return greenStyles;
      default:
        throw new Error("Unknown button type: " + type);
    }
  };

  private getContent = (titleMainStyle: TextStyle, iconMainStyle: ImageStyle): JSX.Element => {
    const {title, titleStyle, icon, iconStyle, children} = this.props;
    let content: JSX.Element | null;

    if (icon != null) {
      content = <Image style={[iconMainStyle, iconStyle]} source={icon} defaultSource={icon}/>;
    } else {
      content = title != null ? (
        <Text style={[titleMainStyle, titleStyle]} numberOfLines={1}>
          {title}
        </Text>
      ) : null;
    }

    return (
      <Fragment>
        {content}
        {children}
      </Fragment>
    );
  };
}

const commonContainer = {
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: 18,
  paddingHorizontal: 16,
} as ViewStyle;

const commonTitle = {
  fontSize: 18,
  fontFamily: Fonts.regular,
} as TextStyle;

const commonIcon = {
  width: 40,
  height: 40,
} as ImageStyle;

const negativeStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.red}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.white}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.white}]) as ImageStyle,
});

const greenStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.green}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.white}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.white}]) as ImageStyle,
});

const neutralStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.gray}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.black}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.black}]) as ImageStyle,
});

const positiveStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.green}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.white}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.white}]) as ImageStyle,
});

const actionStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.blue}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.white}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.white}]) as ImageStyle,
});

const transparentStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {backgroundColor: Colors.transparent}]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.black}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.white}]) as ImageStyle,
});

const borderStyles = styleSheetCreate({
  container: styleSheetFlatten([commonContainer, {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.black,
  }]) as ViewStyle,
  title: styleSheetFlatten([commonTitle, {color: Colors.black}]) as TextStyle,
  icon: styleSheetFlatten([commonIcon, {tintColor: Colors.black}]) as ImageStyle,
});
