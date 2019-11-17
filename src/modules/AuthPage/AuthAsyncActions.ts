import {SimpleThunk} from "../../common/simpleThunk";
import { Dispatch } from "redux";
import {AuthActions} from "./AuthActions";
import {IAuthParams} from "../../types/interfaces";
import {NavigationActions} from "../../navigation/navigation";
import {requestsRepository} from "../../core/api/requestsRepository";
import {showToast} from "../../common/showToast";

export class AuthAsyncActions {
    static login(login: string, password: string): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            //TODO: Можно сократить параметры, для удобства и разместить всё в одну строчку
            const params: IAuthParams = {
                email: login,
                password: password,
            };
            try {
                dispatch(AuthActions.login.started(params));
                //TODO: Комментарии нужно убирать
               // const guid: string | null = await requestsRepository.authenticationApiRequest.authorization(params as UserRequest);
                const guid = await  requestsRepository.signInApiRequest.signIn(params);
                //TODO: Почему в результате стоит ещё ИЛИ если АПИ возвращает всегда строку?
                dispatch(AuthActions.login.done({params, result: guid || ""}));
                dispatch(NavigationActions.navigateToListCafe());
            } catch (error) {
                showToast(error.message);
                dispatch(AuthActions.login.failed({params, error}));
            }
        };
    }
}
