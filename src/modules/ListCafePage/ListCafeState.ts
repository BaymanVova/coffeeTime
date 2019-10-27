import {ICafeInfo} from "../../core/api/generated/CoffeeReqiest";
import {LoadState} from "../../common/loadState";

export interface IListCafeState {
    listCafe: ICafeInfo[];
    loadState: LoadState;
    error?: string;
}

export const ListCafeInitialState: IListCafeState = {
    listCafe: [],
    loadState: LoadState.needLoad,
    error: "",
}
