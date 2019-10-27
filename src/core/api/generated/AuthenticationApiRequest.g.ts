import {BaseRequest} from "../BaseRequest";
import {IUserRequest} from "./dto/SignInRequest.g";

export class AuthenticationApiRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
        this.signIn = this.signIn.bind(this);
    }

    signIn(signInRequest: IUserRequest): Promise<string> {
         return this.fetch(
             "/api/User/Authorization",
             {
             method: "POST",
             body: JSON.stringify(signInRequest)
         })
             .then((response) => response.json())
             .catch(BaseRequest.handleError);
    }
}
