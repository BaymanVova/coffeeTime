export interface ICafeRequest {
    sessionId: string;
    cafeId: string;
}

export interface ISetFavoriteRequest {
    cafeId?: string;
    productId: string;
}
