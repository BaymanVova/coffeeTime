import {actionCreator} from "../../core/store";
import {ICafeInfo, IProductBriefInfo} from "../../core/api/generated/CoffeeReqiest";

export class CafeActions {
    static getInfo = actionCreator.async<string, ICafeInfo | null, Error>("Cafe/GET_INFO");
    static getListDrinks = actionCreator.async<string, IProductBriefInfo[], Error>("Cafe/GET_LISTDRINK");
    static setFavorite = actionCreator.async<string, boolean, Error>("Cafe/SET_FAVORITE");
    static unsetFavorite = actionCreator.async<string, boolean, Error>("Cafe/UNSET_FAVORITE");
}
