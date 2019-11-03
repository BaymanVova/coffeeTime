import {LoadState} from "../../common/loadState";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";

export interface IListCafeState {
    listCafe: ICafeResponse[];
    loadState: LoadState;
    error?: string;
}

export const ListCafeInitialState: IListCafeState = {
    listCafe: [],
    loadState: LoadState.needLoad,
    error: "",
}
