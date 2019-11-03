import {actionCreator} from "../../core/store";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";

export class ListCafeActions {
    static getListCafe = actionCreator.async<IEmpty, ICafeResponse[], Error>("ListCafe/GET_ALLCAFE");
}
