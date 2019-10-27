import {SimpleThunk} from "../../common/simpleThunk";
import {IAuthParams} from "../../types/interfaces";
import {Dispatch} from "redux";
import {RegistrationActions} from "./RegistrationActions";
import {requestsRepository} from "../../core/api/requestsRepository";
import {UserRequest} from "../../core/api/generated/CoffeeReqiest";
import {NavigationActions} from "../../navigation/navigation";

export class RegistrationAsyncActions {
    static registartion(params: IAuthParams): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            try{
                dispatch(RegistrationActions.registration.started(params));
                const guid = await requestsRepository.authenticationApiRequest.register(params as UserRequest);
                dispatch(RegistrationActions.registration.done({params, result: guid || "" }));
                dispatch(NavigationActions.navigateToListCafe());
            } catch (error) {
                dispatch((RegistrationActions.registration.failed({params, error})));
            }
        };
    }
}
