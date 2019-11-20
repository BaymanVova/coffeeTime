import {SimpleThunk} from "../../common/simpleThunk";
import { Dispatch } from "redux";
import {AuthActions} from "./AuthActions";
import {IAuthParams} from "../../types/interfaces";
import {NavigationActions} from "../../navigation/navigation";
import {requestsRepository} from "../../core/api/requestsRepository";
import {showToast} from "../../common/showToast";

export class AuthAsyncActions {
    static login(email: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IAuthParams = {email, password};
            try {
                dispatch(AuthActions.login.started(params));
                const guid = await  requestsRepository.signInApiRequest.signIn(params);
                dispatch(AuthActions.login.done({params, result: guid}));
                dispatch(NavigationActions.navigateToListCafe());
            } catch (error) {
                showToast(error.message);
                dispatch(AuthActions.login.failed({params, error}));
            }
        };
    }
}
