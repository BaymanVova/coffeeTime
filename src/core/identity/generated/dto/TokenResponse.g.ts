/*tslint:disable*/

export interface TokenResponse {
    identityToken: string;
    accessToken: string;
    accessTokenLifetime: number;
    refreshToken: string;
}