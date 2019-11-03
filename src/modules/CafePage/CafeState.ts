import {LoadState} from "../../common/loadState";
import {ICafeResponse} from "../../core/api/generated/dto/CafeResponse.g";
import {IProductBriefInfoResponse} from "../../core/api/generated/dto/ProductResponse.g";

export interface ICafeState {
    loadState: LoadState;
    error: string;
    cafeInfo: ICafeResponse | null;
    listDrinks: IProductBriefInfoResponse[] | [];
}

export const CafeInfoInitialState: ICafeState = {
    loadState: LoadState.needLoad,
    error: "",
    cafeInfo: null,
    listDrinks: [],
}
