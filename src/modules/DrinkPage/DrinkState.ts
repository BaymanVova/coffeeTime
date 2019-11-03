import {LoadState} from "../../common/loadState";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

export interface IDrinkState {
    loadState: LoadState;
    error: string;
    drinkInfo: IProductFullInfoResponse | null;
}

export const DrinkInitialState: IDrinkState = {
    loadState: LoadState.needLoad,
    error: "",
    drinkInfo: null,
}
