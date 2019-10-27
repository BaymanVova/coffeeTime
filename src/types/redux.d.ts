/* tslint:disable */
import {Action, Dispatch} from "redux";

declare module "redux" {
    import {IAppState} from "../core/store/appState";
    import {ThunkAction} from "redux-thunk";

    export interface Dispatch<S = IAppState> {
        <A extends Action | ThunkAction>(action: A): A;
    }

}