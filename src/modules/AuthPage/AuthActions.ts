import {actionCreator} from "../../core/store";
import {IAuthParams} from "../../types/interfaces";

export class AuthActions {
    static login = actionCreator.async<IAuthParams, string, Error>("Auth/LOGIN");
    static logout = actionCreator("Auth/LOGOUT");
}
