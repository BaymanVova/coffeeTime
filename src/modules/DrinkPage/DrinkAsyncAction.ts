import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {IAppState} from "../../core/store/appState";
import {DrinkActions} from "./DrinkActions";
import {requestsRepository} from "../../core/api/requestsRepository";
import {ProductRequest} from "../../core/api/generated/CoffeeReqiest";

export class DrinkAsyncAction {
    static getDrink(productId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(DrinkActions.getDrink.started);
                const sessionId = getState().system.authToken || "";
                const drinkInfo = await requestsRepository.productsApiRequest.getProduct({sessionId, productId} as ProductRequest);
                if (drinkInfo) {
                    dispatch(DrinkActions.getDrink.done({params: productId, result: drinkInfo}));
                }
                dispatch(DrinkActions.getDrink.done);
            } catch (error) {
                dispatch(DrinkActions.getDrink.failed({params: productId, error}));
            }
        };
    }
}
