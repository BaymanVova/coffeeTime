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
import {localization} from "../../common/localization/localization";

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

    constructor(props: IEmpty) {
        super(props);
        //TODO: Не должно быть здесь
        //Пока на этапе тестирования для ускорения ввода
        this.state = {
            login: "vladika_ept@mail.ru",
            password: "123456",
        };
    }

    private onLoginChange = (login: string): void => {
        this.setState({login});
    };
    private onPasswordChange = (password: string): void => {
        this.setState({password});
    };
    render(): JSX.Element {
        const {login, password} = this.state;

        //TODO: Ждать следующего стрима, где покажут как с изображениями работать
        //TODO: Указываются не все параметры для Input'ов (большего комфорта пользователя), покажу в стриме
        //TODO: Оба текста должны быть вынесены в локализации
        //TODO: Что-то не так пошло с отступами, скорее всего был ещё один контейнер и просто потом исчез
        // у меня вроде норм всё с оступами

        return (
            <ImageBackground style={styles.container} source={require("../../../resources/images/main_background.png")}>
                        <Title style={styles.title}>{localization.auth.coffeTime}</Title>
                        <Text style={styles.subtitle}>{localization.auth.territory}</Text>
                        <View style={styles.groupinput}>
                            <AuthInput
                                placeholder={localization.auth.email}
                                value={login}
                                onChangeText={this.onLoginChange}
                            />
                            <AuthInput
                                placeholder={localization.auth.password}
                                value={password}
                                onChangeText={this.onPasswordChange}
                                secureTextEntry={true}
                            />
                            <RoundButton click={this.onLoginPress} disabled={this.stateProps.isAuthorizing}>
                                {localization.auth.signIn}
                            </RoundButton>
                            <RoundButton click={this.dispatchProps.navigateToBack}>
                                {localization.auth.back}
                            </RoundButton>
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
});
