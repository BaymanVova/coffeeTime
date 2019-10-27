import React from "react";
import {ImageBackground, Text, TextStyle, View, ViewStyle} from "react-native";
import { BaseReduxComponent } from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {Dispatch} from "redux";
import {NavigationActions} from "../../navigation/navigation";
import {styleSheetCreate} from "../../common/utils";
import LinearGradient from "react-native-linear-gradient";
import {RoundButton} from "../../common/components/UI/RoundButton";
import {NoHeader} from "../../common/components/Headers";
import {Title} from "../../common/components/Title";
import {Colors, Fonts} from "../../core/theme";

interface IDispatchProps {
    gotoLogin: () => void;
    gotoRegistration: () => void;
}

@connectAdv(null,
    (dispatch: Dispatch): IDispatchProps => ({
        gotoLogin: (): void => {
            dispatch(NavigationActions.navigateToAuthPage());
        },
        gotoRegistration: (): void => {
            dispatch(NavigationActions.navigateToRegistration());
        },
    }),
)

export class MainPage extends BaseReduxComponent<IEmpty, IDispatchProps, IEmpty>  {
    static navigationOptions = NoHeader();

    private onLoginPress = (): void => {
        this.dispatchProps.gotoLogin();
    };
    private onRegistrationPress = (): void => {
        this.dispatchProps.gotoRegistration();
    };
    render(): JSX.Element {
        return (
            <ImageBackground style={styles.container} source={require("../../../resources/images/main_background.png")}>
                <LinearGradient colors={["transparent", "rgba(243, 233, 216, 0.8)"]}  style={styles.linearGradient}>
                    <View style={styles.inner}>
                        <Title style={styles.title}>{"CoffeTime"}</Title>
                        <Text style={styles.subtitle}>территория кофе</Text>
                        <View style={styles.groupButton}>
                            <RoundButton click={this.onLoginPress}>
                                Вход
                            </RoundButton>
                            <RoundButton click={this.onRegistrationPress}>
                                Регистрация
                            </RoundButton>
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
    } as ViewStyle,
    inner: {
        flex: 1,
        alignItems: "center",
    } as ViewStyle,
    linearGradient: {
        flex: 1,
        paddingTop: "20%",
        paddingBottom: "10%",
    } as ViewStyle,
    title: {
        color: Colors.white,
        fontSize: 64,
    } as TextStyle,
    subtitle: {
        fontSize: 16,
        color: Colors.white,
        fontFamily: Fonts.light,
        marginLeft: "22%",
        marginTop: -15,
    } as TextStyle,
    groupButton: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-end",
        alignItems: "center",
    } as ViewStyle,
})
