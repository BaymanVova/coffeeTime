import {LoadState} from "../loadState";
import _ from "lodash";
import {DEFAULT_PAGE_SIZE} from "./calculatePage";

export function combinePagedItems<T extends { id: string }>
(loadState: LoadState, existingList: T[], newPage: T[]): { list: T[], loadState: LoadState } {
    const current = existingList;
    let resultItems: T[];
    let resultLoadState: LoadState;
    if (current.length == 0) {
        resultLoadState = LoadState.idle;
        resultItems = newPage;
    } else {
        if (loadState == LoadState.loadingMore) {
            resultItems = [...current];
            resultItems = _.uniqBy(resultItems.concat(newPage), i => i.id);
            resultLoadState = newPage.length < DEFAULT_PAGE_SIZE ? LoadState.allIsLoaded : LoadState.idle;
        } else {
            resultItems = newPage;
            resultLoadState = LoadState.idle;
        }
    }

    return {list: resultItems, loadState: resultLoadState};
}