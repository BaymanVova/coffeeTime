import {BaseRequest} from "../BaseRequest";
import {ICafeResponse} from "./dto/CafeResponse.g";
import {ICafeRequest} from "./dto/CafeRequest.g";

export class CafeApiRequest extends BaseRequest {
    constructor(protected baseUrl: string) {
        super();
        this.getAll = this.getAll.bind(this);
        this.getCafe = this.getCafe.bind(this);
    }

    getAll(sessionId: string, config?: Object): Promise<ICafeResponse[]> {
        return this.fetch(
            "/api/Cafe/GetAll",
            Object.assign({
                method: "POST",
                body: JSON.stringify(sessionId),
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }

    getCafe(cafeRequest: ICafeRequest, config?: Object): Promise<ICafeResponse> {
        console.log("Новое API");

        return this.fetch(
            "/api/Cafe/GetCafe",
            Object.assign({
                method: "POST",
                body: JSON.stringify(cafeRequest),
            }, config))
            .then((response) => response.json())
            .catch(BaseRequest.handleError);
    }
}
