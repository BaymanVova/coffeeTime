import {actionCreator} from "../../core/store";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

export class DrinkActions {
    static getDrink = actionCreator.async<string, IProductFullInfoResponse, Error>("Drink/GET_DRINK");
}
