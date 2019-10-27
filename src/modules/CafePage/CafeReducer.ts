import {CafeInfoInitialState, ICafeState} from "./CafeState";
import {newState} from "../../common/newState";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {CafeActions} from "./CafeActions";
import {Failure, Success} from "typescript-fsa";
import {ICafeInfo, IProductBriefInfo} from "../../core/api/generated/CoffeeReqiest";
import {LoadState} from "../../common/loadState";

function getInfoStartedHandler(state: ICafeState): ICafeState {
    return newState(state, {loadState: LoadState.firstLoad, error: ""});
}

function getInfoDoneHandler(state: ICafeState, success: Success<string, ICafeInfo | null>): ICafeState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: "", cafeInfo: success.result});
}

function getInfoFailedHandler(state: ICafeState, failed: Failure<string, Error>): ICafeState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function getDrinksStartedHandler(state: ICafeState): ICafeState {
    return newState(state, {loadState: LoadState.firstLoad, error: ""});
}

function getDrinksDoneHandler(state: ICafeState, success: Success<string, IProductBriefInfo[]>): ICafeState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: "", listDrinks: success.result});
}

function getDrinksFailedHandler(state: ICafeState, failed: Failure<string, Error>): ICafeState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function setFavoriteStartedHandler(state: ICafeState): ICafeState {
    return newState(state, {loadState: LoadState.needLoad, error: ""});
}

function setFavoriteDoneHandler(state: ICafeState, success: Success<string, boolean>): ICafeState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: ""});
}

function setFavoriteFailedHandler(state: ICafeState, failed: Failure<string, Error>): ICafeState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

function unsetFavoriteStartedHandler(state: ICafeState): ICafeState {
    return newState(state, {loadState: LoadState.needLoad, error: ""});
}

function unsetFavoriteDoneHandler(state: ICafeState, success: Success<string, boolean>): ICafeState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: ""});
}

function unsetFavoriteFailedHandler(state: ICafeState, failed: Failure<string, Error>): ICafeState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const cafeInfoReducer = reducerWithInitialState(CafeInfoInitialState)
    .case(CafeActions.getInfo.started, getInfoStartedHandler)
    .case(CafeActions.getInfo.done, getInfoDoneHandler)
    .case(CafeActions.getInfo.failed, getInfoFailedHandler)
    .case(CafeActions.getListDrinks.started, getDrinksStartedHandler)
    .case(CafeActions.getListDrinks.done, getDrinksDoneHandler)
    .case(CafeActions.getListDrinks.failed, getDrinksFailedHandler)
    .case(CafeActions.setFavorite.started, setFavoriteStartedHandler)
    .case(CafeActions.setFavorite.done, setFavoriteDoneHandler)
    .case(CafeActions.setFavorite.failed, setFavoriteFailedHandler)
    .case(CafeActions.unsetFavorite.started, unsetFavoriteStartedHandler)
    .case(CafeActions.unsetFavorite.done, unsetFavoriteDoneHandler)
    .case(CafeActions.unsetFavorite.failed, unsetFavoriteFailedHandler)
;
