import {SimpleThunk} from "../../common/simpleThunk";
import { Dispatch } from "redux";
import {AuthActions} from "./AuthActions";
import {IAuthParams} from "../../types/interfaces";
import {NavigationActions} from "../../navigation/navigation";
import {requestsRepository} from "../../core/api/requestsRepository";
import {UserRequest} from "../../core/api/generated/CoffeeReqiest";

export class AuthAsyncActions {
    static login(login: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            const params: IAuthParams = {
                email: login,
                password: password,
            };
            try {
                dispatch(AuthActions.login.started(params));
                const guid: string | null = await requestsRepository.authenticationApiRequest.authorization(params as UserRequest);
                dispatch(AuthActions.login.done({params, result: guid || ""}));
                dispatch(NavigationActions.navigateToListCafe());
            } catch (error) {
                dispatch(AuthActions.login.failed({params, error}));
            }
        };
    }
}
