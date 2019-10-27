import {reducerWithInitialState} from "typescript-fsa-reducers";
import {IListCafeState, ListCafeInitialState} from "./ListCafeState";
import {ListCafeActions} from "./ListCafeActions";
import {newState} from "../../common/newState";
import {ICafeInfo} from "../../core/api/generated/CoffeeReqiest";
import {Failure, Success} from "typescript-fsa";
import {LoadState} from "../../common/loadState";

function getListCafeStartedHandler(state: IListCafeState): IListCafeState {
    return newState(state, { loadState: LoadState.firstLoad, error: ""});
}

function getListCafeDoneHandler(state: IListCafeState, success: Success<IEmpty, ICafeInfo[]>): IListCafeState {
    return newState(state, {loadState: LoadState.allIsLoaded, error: "", listCafe: success.result});
}

function getListCafeFailedHandler(state: IListCafeState, failed: Failure<IEmpty, Error>): IListCafeState {
    return newState(state, {loadState: LoadState.error, error: failed.error.message});
}

export const listCafeReducer = reducerWithInitialState(ListCafeInitialState)
    .case(ListCafeActions.getListCafe.started, getListCafeStartedHandler)
    .case(ListCafeActions.getListCafe.done, getListCafeDoneHandler)
    .case(ListCafeActions.getListCafe.failed, getListCafeFailedHandler)
;
