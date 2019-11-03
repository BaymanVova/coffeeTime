import React from "react";
import {ImageBackground, Text,  TextStyle,  View, ViewStyle} from "react-native";
import {NoHeader} from "../../common/components/Headers";
import {IAuthParams} from "../../types/interfaces";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {RegistrationAsyncActions} from "./RegistrationAsyncActions";
import {BaseReduxComponent} from "../../core/BaseComponent";
import LinearGradient from "react-native-linear-gradient";
import {Title} from "../../common/components/Title";
import {AuthInput} from "../../common/components/UI/AuthInput";
import {RoundButton} from "../../common/components/UI/RoundButton";
import {styleSheetCreate} from "../../common/utils";
import {Colors, Fonts} from "../../core/theme";
import {NavigationActions} from "../../navigation/navigation";
import {KeyboardAvoidingViewWrapper} from "../../common/components/KeyboardAvodingViewWrapper";

interface IStateProps {
    isRegistration: boolean;
    error: string;
}

interface IDispatchProps {
    registration: (params: IAuthParams) => void;
    navigateToBack: () => void;
}

interface IState {
    email: string;
    password: string;
}

@connectAdv(
    ({registration}: IAppState): IStateProps => ({
        isRegistration: registration.isRegistration,
        error: registration.error,
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        registration: (params: IAuthParams): void => {
            dispatch(RegistrationAsyncActions.registartion(params));
        },
        navigateToBack: (): void => {
            dispatch(NavigationActions.navigateToBack());
        },
    }),
)

export class RegistrationPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = NoHeader();

    constructor(props: any) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    private onLoginChange = (login: string): void => {
        this.setState({email: login});
    };
    private onPasswordChange = (password: string): void => {
        this.setState({password: password});
    };

    render(): JSX.Element {
        return (

            <ImageBackground style={styles.container} source={require("../../../resources/images/main_background.png")}>
                <KeyboardAvoidingViewWrapper style={{flex: 1}}>
                <LinearGradient colors={["transparent", "rgba(243, 233, 216, 0.8)"]}  style={styles.linearGradient}>
                    <View style={styles.inner}>
                        <Title style={styles.title}>{"CoffeTime"}</Title>
                        <Text style={styles.subtitle}>территория кофе</Text>
                        <View style={styles.groupinput}>
                            <AuthInput
                                placeholder={"Email"}
                                value={this.state.email}
                                onChangeText={this.onLoginChange}
                            />
                            <AuthInput
                                placeholder={"Password"}
                                value={this.state.password}
                                onChangeText={this.onPasswordChange}
                                secureTextEntry={true}
                            />
                            <RoundButton click={this.onRegPress}>
                                Регистрация
                            </RoundButton>
                            <RoundButton click={this.dispatchProps.navigateToBack}>
                                Назад
                            </RoundButton>
                        </View>
                    </View>
                </LinearGradient>
                </KeyboardAvoidingViewWrapper>
            </ImageBackground>

        );
    }

    private onRegPress = (): void => {
        this.dispatchProps.registration({email: this.state.email, password: this.state.password});
    };
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
    } as ViewStyle,
    inner: {
        flex: 1,
        alignItems: "center",
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
    linearGradient: {
        flex: 1,
        paddingTop: "20%",
        paddingBottom: "10%",
    } as ViewStyle,
    groupinput: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    } as ViewStyle,
})

