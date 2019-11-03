import {actionCreator} from "../../core/store";
import {IUserRequest} from "../../core/api/generated/dto/SignInRequest.g";

export class RegistrationActions {
    static registration = actionCreator.async<IUserRequest, string, Error>("Reg/REGISTRATION");
}
