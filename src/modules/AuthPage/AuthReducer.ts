import {reducerWithInitialState} from "typescript-fsa-reducers";
import {AuthInitialState, IAuthState} from "./AuthState";
import {IAuthParams} from "../../types/interfaces";
import {AuthActions} from "./AuthActions";
import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";

function loginStartHandler(state: IAuthState): IAuthState {
    return newState(state, {isAuthorizing: true, error: null});
}

function loginDoneHandler(state: IAuthState, {result}: Success<IAuthParams, string>): IAuthState {
    return newState(state, {isAuthorizing: false, error: null});
}

function loginFailedHandler(state: IAuthState, failed: Failure<IAuthParams, Error>): IAuthState {
    return newState(state, {isAuthorizing: false, error: failed.error.message});
}

export const  authReducer = reducerWithInitialState(AuthInitialState)
    .case(AuthActions.login.started, loginStartHandler)
    .case(AuthActions.login.done, loginDoneHandler)
    .case(AuthActions.login.failed, loginFailedHandler)
;
