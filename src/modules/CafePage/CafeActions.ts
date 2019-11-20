import {actionCreator} from "../../core/store";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";
import {IProductBriefInfoResponse} from "../../core/api/generated/dto/ProductBriefInfoResponse.g";

export class CafeActions {
    static getInfo = actionCreator.async<string, ICafeResponse | null, Error>("Cafe/GET_INFO");
    //TODO: Небольшие ошибки в типе
    //Какие именно? Грамматические в GET_LISTDRINK?
    static getListDrinks = actionCreator.async<string, IProductBriefInfoResponse[], Error>("Cafe/GET_LIST_DRINK");
    static setFavorite = actionCreator.async<string, boolean, Error>("Cafe/SET_FAVORITE");
    static unsetFavorite = actionCreator.async<string, boolean, Error>("Cafe/UNSET_FAVORITE");
}
