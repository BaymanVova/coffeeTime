import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {IAppState} from "../../core/store/appState";
import {CafeActions} from "./CafeActions";
import {requestsRepository} from "../../core/api/requestsRepository";

export class CafeAsyncActions {
    static getCafeInfo(cafeId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(CafeActions.getInfo.started);
                const sessionId = getState().system.authToken || "";
                const cafeInfo = await requestsRepository.cafeApiRequest.getCafe({sessionId, cafeId});
                dispatch(CafeActions.getInfo.done({params: cafeId, result: cafeInfo}));
            } catch (error) {
                dispatch(CafeActions.getInfo.failed(error));
            }
        };
    }

    static getListDrink(cafeId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(CafeActions.getListDrinks.started);
                const sessionId = getState().system.authToken || "";
                const listDrinks = await requestsRepository.productsApiRequest.getProductsCafe({sessionId, cafeId}) || [];
                dispatch(CafeActions.getListDrinks.done({params: cafeId, result: listDrinks}));
            } catch (error) {
                dispatch(CafeActions.getListDrinks.failed(error));
            }
        };
    }
    static setFavorite(productId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(CafeActions.setFavorite.started);
                const sessionId = getState().system.authToken || "";
                const setfavorite = await requestsRepository.favoriteApiRequest.set({sessionId, productId});
                console.log("setfavorite", setfavorite);
                dispatch(CafeActions.setFavorite.done);
            } catch (error) {
                dispatch(CafeActions.setFavorite.failed(error));
            }
        };
    }

    static unsetFavorite(productId: string): SimpleThunk {
        return async function(dispatch: Dispatch, getState: () => IAppState): Promise<void> {
            try {
                dispatch(CafeActions.setFavorite.started);
                const sessionId = getState().system.authToken || "";
                const unsetfavorite = await requestsRepository.favoriteApiRequest.unset({sessionId, productId});
                console.log("unsetfavorite", unsetfavorite);
                dispatch(CafeActions.setFavorite.done);
            } catch (error) {
                dispatch(CafeActions.setFavorite.failed(error));
            }
        };
    }
}
