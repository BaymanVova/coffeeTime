
export interface IAttributeInfo {
    id: string;
    description: string;
    iconType: string;
}
//TODO: В API действительно такой интерфейс приходит? В плане названий?
export interface IProductFullInfoResponse {
    id: string;
    productName: string;
    price: number;
    cofeId: string;
    cofeName: string;
    favarite: boolean;
    attribute: IAttributeInfo[];
    imagesPath?: string | undefined;
}

export interface IProductBriefInfoResponse {
    id: string;
    cofeId: string;
    name: string;
    price: number;
    favorite: boolean;
    imagesPath?: string | undefined;
}
