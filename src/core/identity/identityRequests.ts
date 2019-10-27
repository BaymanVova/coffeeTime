import {RequestsRepository} from "./generated/RequestsRepository.g";
import {RefreshToken} from "./RefreshToken";

class IdentityRequests extends RequestsRepository {
    constructor() {
        super("");
    }

    refreshToken = new RefreshToken("");
}

export const identityRequests = new IdentityRequests();