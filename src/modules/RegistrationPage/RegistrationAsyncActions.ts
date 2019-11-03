import {SimpleThunk} from "../../common/simpleThunk";
import {Dispatch} from "redux";
import {RegistrationActions} from "./RegistrationActions";
import {requestsRepository} from "../../core/api/requestsRepository";
import {NavigationActions} from "../../navigation/navigation";
import {IUserRequest} from "../../core/api/generated/dto/SignInRequest.g";

export class RegistrationAsyncActions {
    static registartion(params: IUserRequest): SimpleThunk {
        return async function(dispatch: Dispatch): Promise<void> {
            try{
                dispatch(RegistrationActions.registration.started(params));
                const guid = await requestsRepository.signInApiRequest.registration(params);
                dispatch(RegistrationActions.registration.done({params, result: guid || "" }));
                dispatch(NavigationActions.navigateToListCafe());
            } catch (error) {
                dispatch((RegistrationActions.registration.failed({params, error})));
            }
        };
    }
}
