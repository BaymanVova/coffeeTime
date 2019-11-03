import {BaseRequest} from "../BaseRequest";
import {IProductRequest} from "./dto/ProductRequest.g";

export class FavoriteApiRequest extends BaseRequest {
    constructor(protected BaseUrl: string) {
        super();
        this.set = this.set.bind(this);
        this.unset = this.unset.bind(this);
    }

    set(myProduct: IProductRequest, config?: Object): Promise<boolean> {
        return this.fetch("/api/Favorite/Set",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myProduct),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }

    unset(myProduct: IProductRequest, config?: Object): Promise<boolean> {
        return this.fetch("/api/Favorite/Unset",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myProduct),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }
}
