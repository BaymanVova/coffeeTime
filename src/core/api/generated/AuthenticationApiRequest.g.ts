import {BaseRequest} from "../BaseRequest";
import {IUserRequest} from "./dto/SignInRequest.g";

export class AuthenticationApiRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
        this.signIn = this.signIn.bind(this);
        this.registration = this.registration.bind(this);
    }

    signIn(signInRequest: IUserRequest, config?: Object): Promise<string> {
         return this.fetch(
             "/api/User/Authorization",
             Object.assign(
                 {
                     method: "POST",
                     body: JSON.stringify(signInRequest),
                 }, config))
             .then((response) => response.json())
             .catch(BaseRequest.handleError);
    }

    registration(regRequest: IUserRequest, config?: Object): Promise<string> {
        return this.fetch(
            "/api/User/Register",
            Object.assign(
                {
                    method: "POST",
                    body: JSON.stringify(regRequest),
                }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}
