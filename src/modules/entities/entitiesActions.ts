import {actionCreator} from "../../core/store";

export class EntitiesActions {
    static setLanguage = actionCreator<string>("Entities/SET_LANGUAGE");
}