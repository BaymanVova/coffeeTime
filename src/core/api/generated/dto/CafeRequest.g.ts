//TODO: В этих файлах долежн быть только один экспортируемый интерфейс, для отсального должны создаватся отдельные файлы
export interface ICafeRequest {
    sessionId: string;
    cafeId: string;
}

export interface ISetFavoriteRequest {
    cafeId?: string;
    productId: string;
}
