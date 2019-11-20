import React, {PureComponent} from "react";
import {Animated, Easing, Image,  TouchableOpacity, ViewStyle} from "react-native";

interface IState {
    animationSize: Animated.Value;
}
interface IProps {
    favorite: boolean;
    setFavorite: () => void;
}

export class FavoriteIcon extends PureComponent<IProps, IState> {

    private animatedStyle: ViewStyle;
    private transformGrowAnimation: Animated.CompositeAnimation;
    private transformLowerAnimation: Animated.CompositeAnimation;

    constructor(props: IProps) {
        super(props);
        this.state = {
            animationSize: new Animated.Value(1),
        };
        this.animatedStyle = { justifyContent: "center",
            paddingLeft: 10,
            transform: [ {
                scale: this.state.animationSize}] as any };
        this.transformGrowAnimation = Animated.timing(this.state.animationSize, {
            toValue: 1.4,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });
        this.transformLowerAnimation = Animated.timing(this.state.animationSize, {
            toValue: 1,
            duration: 200,
            easing: Easing.linear,
            useNativeDriver: true,
        });
    }

    render(): JSX.Element {
        const {favorite} = this.props;
        const favoriteIcon: JSX.Element = favorite ? <Image source={require("../../../resources/images/icon_heart_pink.png")}/>
            : <Image source={require("../../../resources/images/icon_heart_gray.png")}/>;

        return (
            <Animated.View style={this.animatedStyle}>
                <TouchableOpacity onPress={this.imageClickHandler}>
                    {favoriteIcon}
                </TouchableOpacity>
            </Animated.View>
        );
    }

    private imageClickHandler = (): void => {
        this.props.setFavorite();
        Animated.sequence([
            this.transformGrowAnimation,
            this.transformLowerAnimation,
            this.transformGrowAnimation,
            this.transformLowerAnimation,
        ]).start();
    };

}
