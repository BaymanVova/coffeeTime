import {AuthenticationApiRequest} from "./AuthenticationApiRequest.g";
import {CafeApiRequest} from "./CafeApiRequest.g";
import {ProductApiRequest} from "./ProductApiRequest.g";
import {FavoriteApiRequest} from "./FavoriteApiRequest.g";

export class RequestsRepository {
  constructor(private baseurl: string) {
  }
  favoriteApiRequest = new FavoriteApiRequest(this.baseurl);
  signInApiRequest = new AuthenticationApiRequest(this.baseurl);
  cafeApiRequest = new CafeApiRequest(this.baseurl);
  productsApiRequest = new ProductApiRequest(this.baseurl);
}
