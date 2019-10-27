import {actionCreator} from "../../core/store";
import {ICafeInfo} from "../../core/api/generated/CoffeeReqiest";

export class ListCafeActions {
    static getListCafe = actionCreator.async<IEmpty, ICafeInfo[], Error>("ListCafe/GET_ALLCAFE");
}
