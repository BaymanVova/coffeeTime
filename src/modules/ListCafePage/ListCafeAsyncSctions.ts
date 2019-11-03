import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {ListCafeActions} from "./ListCafeActions";
import {IAppState} from "../../core/store/appState";
import {requestsRepository} from "../../core/api/requestsRepository";

export class ListCafeAsyncActions {
    static getListCafe(): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(ListCafeActions.getListCafe.started);
                const sessionId: string = getState().system.authToken || "";
                const listCafe = await requestsRepository.cafeApiRequest.getAll(sessionId) || [];
                dispatch(ListCafeActions.getListCafe.done({params: "", result: listCafe}));
            } catch (error) {
                dispatch(ListCafeActions.getListCafe.failed({params: {}, error}));
            }
        };
    }
}
