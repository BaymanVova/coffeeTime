import React from "react";
import {ImageBackground, Text, TextStyle, View, ViewStyle} from "react-native";
import {BaseReduxComponent} from "../../core/BaseComponent";
import {connectAdv} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {Dispatch} from "redux";
import {AuthAsyncActions} from "./AuthAsyncActions";
import {NoHeader} from "../../common/components/Headers";
import {styleSheetCreate} from "../../common/utils";
import {RoundButton} from "../../common/components/UI/RoundButton";
import {AuthInput} from "../../common/components/UI/AuthInput";
import {Title} from "../../common/components/Title";
import {Colors, Fonts} from "../../core/theme";
import {NavigationActions} from "../../navigation/navigation";

interface IStateProps {
    isAuthorizing: boolean;
    error: string;
}

interface IDispatchProps {
    login: (login: string, password: string) => void;
    navigateToBack: () => void;
}

interface IState {
    login: string;
    password: string;
}

@connectAdv(
    ({auth}: IAppState): IStateProps => ({
        isAuthorizing: auth.isAuthorizing,
        error: auth.error || "",
    }),
    (dispatch: Dispatch): IDispatchProps => ({
        login: (login: string, password: string): void => {
            dispatch(AuthAsyncActions.login(login, password));
        },
        navigateToBack: (): void => {
            dispatch(NavigationActions.navigateToBack());
        },
    }),
)
export class AuthPage extends BaseReduxComponent<IStateProps, IDispatchProps, IState> {
    static navigationOptions = NoHeader();

    //TODO: В данном случае это не any, props сейчас это обычный пустой интерфейс, т.е. IEmpty
    constructor(props: any) {
        super(props);
        //TODO: Не должно быть здесь
        this.state = {
            login: "vladika_ept@mail.ru",
            password: "123456",
        };
    }

    //TODO: Можно сократить
    private onLoginChange = (login: string): void => {
        this.setState({login: login});
    };
    private onPasswordChange = (password: string): void => {
        this.setState({password: password});
    };
    render(): JSX.Element {
        const {login, password} = this.state;

        //TODO: Что-то не так пошло с отступами, скорее всего был ещё один контейнер и просто потом исчез
        return (
            //TODO: В следующем стриме покажу как с изображениями работать
            <ImageBackground style={styles.container} source={require("../../../resources/images/main_background.png")}>
                    //TODO: Не совсем понятно зачем этот контейнер
                    <View style={styles.inner}>
                        //TODO: Оба текста должны быть вынесены в локализации
                        <Title style={styles.title}>{"CoffeTime"}</Title>
                        <Text style={styles.subtitle}>территория кофе</Text>
                        <View style={styles.groupinput}>
                            //TODO: Указываются не все параметры для Input'ов (большего комфорта пользователя), покажу в стриме
                            <AuthInput
                                placeholder={"Email"}
                                value={login}
                                onChangeText={this.onLoginChange}
                            />
                            <AuthInput
                                placeholder={"Password"}
                                value={password}
                                onChangeText={this.onPasswordChange}
                                secureTextEntry={true}
                            />
                            //TODO: Оба текста должны быть вынесены в локализации
                            <RoundButton click={this.onLoginPress} disabled={this.stateProps.isAuthorizing}>
                                Вход
                            </RoundButton>
                            <RoundButton click={this.dispatchProps.navigateToBack}>
                                Назад
                            </RoundButton>
                        </View>
                    </View>
            </ImageBackground>
        );
    }
    private onLoginPress = (): void => {
        this.dispatchProps.login(this.state.login, this.state.password);
    };
}
//TODO: Лучше стараться не использовать width: "100%"
const styles = styleSheetCreate({
    container: {
        flex: 1,
        paddingTop: "20%",
        paddingBottom: "10%",
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
//TODO: Пропущен ;
