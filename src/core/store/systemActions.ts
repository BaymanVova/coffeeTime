import {TokenResponse} from "../identity/generated/dto/TokenResponse.g";
import {actionCreator} from "./actionCreator";

export class SystemActions {
    static setToken = actionCreator<TokenResponse>("System/SET_TOKEN");
}