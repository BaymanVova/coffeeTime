import {actionCreator} from "../../core/store";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";
import {IProductBriefInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

export class CafeActions {
    static getInfo = actionCreator.async<string, ICafeResponse | null, Error>("Cafe/GET_INFO");
    static getListDrinks = actionCreator.async<string, IProductBriefInfoResponse[], Error>("Cafe/GET_LISTDRINK");
    static setFavorite = actionCreator.async<string, boolean, Error>("Cafe/SET_FAVORITE");
    static unsetFavorite = actionCreator.async<string, boolean, Error>("Cafe/UNSET_FAVORITE");
}
