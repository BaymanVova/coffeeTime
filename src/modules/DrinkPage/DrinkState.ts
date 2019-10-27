import {LoadState} from "../../common/loadState";
import {IProductFullInfo} from "../../core/api/generated/CoffeeReqiest";

export interface IDrinkState {
    loadState: LoadState;
    error: string;
    drinkInfo: IProductFullInfo | null;
}

export const DrinkInitialState: IDrinkState = {
    loadState: LoadState.needLoad,
    error: "",
    drinkInfo: null,
}
