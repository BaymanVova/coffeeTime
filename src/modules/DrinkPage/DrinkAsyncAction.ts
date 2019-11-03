import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {IAppState} from "../../core/store/appState";
import {DrinkActions} from "./DrinkActions";
import {requestsRepository} from "../../core/api/requestsRepository";

export class DrinkAsyncAction {
    static getDrink(productId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(DrinkActions.getDrink.started);
                const sessionId = getState().system.authToken || "";
                const drinkInfo = await requestsRepository.productsApiRequest.getProduct({sessionId, productId});
                if (drinkInfo) {
                    dispatch(DrinkActions.getDrink.done({params: productId, result: drinkInfo}));
                } else {
                    throw new Error("Список напитков пуст.");
                }
            } catch (error) {
                dispatch(DrinkActions.getDrink.failed({params: productId, error}));
            }
        };
    }
}
