import { BaseRequest } from "../BaseRequest";
import {IProductRequest} from "./dto/ProductRequest.g";
import {IProductFullInfoResponse} from "./dto/ProductResponse.g";
import {ICafeRequest} from "./dto/CafeRequest.g";
import {IProductBriefInfoResponse} from "./dto/ProductBriefInfoResponse.g";

export class ProductApiRequest extends BaseRequest {
    constructor (protected baseUrl: string) {
        super();
        this.getProductsCafe = this.getProductsCafe.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    getProductsCafe(myCafe: ICafeRequest, config?: Object): Promise<IProductBriefInfoResponse[]> {

        return this.fetch("/api/Product/GetProductsCafe",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myCafe),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }

    getProduct(myProduct: IProductRequest, config?: Object): Promise<IProductFullInfoResponse> {

        return this.fetch("/api/Product/GetProduct",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myProduct),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }
}
