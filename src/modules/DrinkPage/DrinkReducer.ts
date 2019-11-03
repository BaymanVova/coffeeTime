import {DrinkInitialState, IDrinkState} from "./DrinkState";
import {newState} from "../../common/newState";
import {LoadState} from "../../common/loadState";
import {Failure, Success} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {DrinkActions} from "./DrinkActions";
import {IProductFullInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

function getDrinkStartedHandler(state: IDrinkState): IDrinkState {
    return newState(state, {loadState: LoadState.firstLoad, error: ""});
}

function getDrinkDoneHandler(state: IDrinkState, success: Success<string, IProductFullInfoResponse>): IDrinkState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: "", drinkInfo: success.result});
}

function getDrinkFailedHandler(state: IDrinkState, failed: Failure<string, Error>): IDrinkState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const drinkReducer = reducerWithInitialState(DrinkInitialState)
    .case(DrinkActions.getDrink.started, getDrinkStartedHandler)
    .case(DrinkActions.getDrink.done, getDrinkDoneHandler)
    .case(DrinkActions.getDrink.failed, getDrinkFailedHandler)
;
