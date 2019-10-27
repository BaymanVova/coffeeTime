import {actionCreator} from "../../core/store";
import {IProductFullInfo} from "../../core/api/generated/CoffeeReqiest";

export class DrinkActions {
    static getDrink = actionCreator.async<string, IProductFullInfo, Error>("Drink/GET_DRINK");
}
