import {ICafeInfo, IProductBriefInfo} from "../../core/api/generated/CoffeeReqiest";
import {LoadState} from "../../common/loadState";

export interface ICafeState {
    loadState: LoadState;
    error: string;
    cafeInfo: ICafeInfo | null;
    listDrinks: IProductBriefInfo[] | [];
}

export const CafeInfoInitialState: ICafeState = {
    loadState: LoadState.needLoad,
    error: "",
    cafeInfo: null,
    listDrinks: [],
}
