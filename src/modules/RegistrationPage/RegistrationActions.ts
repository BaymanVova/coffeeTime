import {actionCreator} from "../../core/store";
import {IAuthParams} from "../../types/interfaces";

export class RegistrationActions {
    static registration = actionCreator.async<IAuthParams, string, Error>("Reg/REGISTRATION");
}
