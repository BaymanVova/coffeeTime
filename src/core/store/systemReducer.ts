import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {TokenResponse} from "../identity/generated/dto/TokenResponse.g";
import {IAppState} from "./appState";
import {CoreActions} from "./coreActions";
import {SystemActions} from "./systemActions";
import {ISystemState, SystemInitialState} from "./systemState";
import {Success} from "typescript-fsa";
import {IAuthParams} from "../../types/interfaces";
import {AuthActions} from "../../modules/AuthPage/AuthActions";
import {RegistrationActions} from "../../modules/RegistrationPage/RegistrationActions";

function rehydrateHandler(state: ISystemState, rehydratedState: IAppState): ISystemState {
    return newState(rehydratedState.system || state, {});
}

function setTokenHandler(state: ISystemState, token: TokenResponse): ISystemState {
    return newState(state, {authToken: token.accessToken, refreshToken: token.refreshToken});
}

function loginDoneHandler(state: ISystemState, {result}: Success<IAuthParams, string>): ISystemState {
    return newState(state, {authToken: result});
}

export const systemReducer = reducerWithInitialState(SystemInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(SystemActions.setToken, setTokenHandler)
    .case(AuthActions.login.done, loginDoneHandler)
    .case(RegistrationActions.registration.done, loginDoneHandler)
    .build();
