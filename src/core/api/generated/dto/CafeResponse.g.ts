/*tslint:disable*/
//TODO: Почему id может быть undefined?
//TODO: У id и images уже есть ? не нужно добавлять ещё | undefined
export interface ICafeResponse {
    id?: string | undefined;
    name: string;
    address: string;
    coordinates: string;
    description: string;
    images?: string | undefined;
}
