import {LoadState} from "../../common/loadState";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

/*
TODO: Можно было бы сохранять информацию о напитке в массив, чтобы показывать пользователю какую-то информацию
 если он уже открывал напиток, так ты сохраняешь только один напиток
 loadState здесь не обязателен (через boolean было бы проще)
*/
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
