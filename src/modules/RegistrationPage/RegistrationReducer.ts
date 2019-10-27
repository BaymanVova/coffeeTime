import {IRegistrationState, RegInitialState} from "./RegistrationState";
import {newState} from "../../common/newState";
import {Failure, Success} from "typescript-fsa";
import {IAuthParams} from "../../types/interfaces";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {RegistrationActions} from "./RegistrationActions";

function regStartHandler(state: IRegistrationState): IRegistrationState {
    return newState(state, {isRegistration: true, error: ""});
}

function regDoneHandler(state: IRegistrationState, {result}: Success<IAuthParams, string>): IRegistrationState {
    return newState(state, {isRegistration: false, error: ""});
}

function regFailedHandler(state: IRegistrationState, failed: Failure<IAuthParams, Error>): IRegistrationState {
    return newState(state, {isRegistration: false, error: failed.error.message});
}

export const registrationReducer = reducerWithInitialState(RegInitialState)
    .case(RegistrationActions.registration.started, regStartHandler)
    .case(RegistrationActions.registration.done, regDoneHandler)
    .case(RegistrationActions.registration.failed, regFailedHandler)
;
