import { BaseRequest } from "../BaseRequest";
import {IProductRequest} from "./dto/ProductRequest.g";
import {IProductBriefInfoResponse, IProductFullInfoResponse} from "./dto/ProductResponse.g";
import {ICafeRequest} from "./dto/CafeRequest.g";

export class ProductApiRequest extends BaseRequest {
    constructor (protected baseUrl: string) {
        super();
        this.getProductsCafe = this.getProductsCafe.bind(this);
        this.getProduct = this.getProduct.bind(this);
    }

    getProductsCafe(myCafe: ICafeRequest, config?: Object): Promise<IProductBriefInfoResponse[]> {
        console.log("getProductCafe");

        return this.fetch("/api/Product/GetProductsCafe",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myCafe),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }

    getProduct(myProduct: IProductRequest, config?: Object): Promise<IProductFullInfoResponse> {
        console.log("getProduct");

        return this.fetch("/api/Product/GetProduct",
            Object.assign({
                method: "POST",
                body: JSON.stringify(myProduct),
            }, config))
            .then(response => response.json())
            .catch(BaseRequest.handleError);
    }
}
