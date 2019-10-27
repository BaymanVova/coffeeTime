import {CafeClientRequest, FavoriteClientRequest, ProductClientRequest, UserClientRequest} from "./CoffeeReqiest";

export class RequestsRepository {
  authenticationApiRequest = new UserClientRequest();
  cafeApiRequest = new CafeClientRequest();
  productsApiRequest = new ProductClientRequest();
  favoriteApiRequest = new FavoriteClientRequest();
}
