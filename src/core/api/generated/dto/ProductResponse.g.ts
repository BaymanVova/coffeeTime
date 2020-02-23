import {IAttributeInfo} from "./AttributeInfo.g";

export interface IProductFullInfoResponse {
    id: string;
    productName: string;
    price: number;
    cofeId: string;
    cofeName: string;
    favorite: boolean;
    attribute: IAttributeInfo[];
    imagesPath?: string;
}
