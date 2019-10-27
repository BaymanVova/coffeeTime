/*tslint:disable*/
import {BaseRequest} from "./BaseRequest";

interface IResreshTokenRespons {
    refresh_token: string,
    access_token: string,
    expires_in: number,
    id_token: string,
}

export class RefreshToken extends BaseRequest {
    constructor(protected baseurl: string) {
        super();
        this.refreshToken = this.refreshToken.bind(this);
    }

    refreshToken(refreshToken: string, config?: Object): Promise<IResreshTokenRespons> {
        const formData = new FormData();
        formData.append("grant_type", "refresh_token");
        formData.append("refresh_token", refreshToken);
        formData.append("client_id", "mobile");

        return this.fetch(
            "/connect/token",
            Object.assign({
                method: "POST",
                body: formData,
                headers: {"ContentType": "application/x-www-form-urlencoded"},
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}