import {assertNotNull} from "../../common/assertNotNull";
import {UrlHelper} from "../../common/helpers";
import {ExceptionType, NoAuthError} from "../exceptionTypes";
import {appSettingsProvider} from "../settings";
import {TokenResponse} from "./generated/dto/TokenResponse.g";

export interface IRequestOptions {
    getToken: () => string | null;
    setToken: (token: TokenResponse) => void;
    onAuthError: () => void;
}

export class BaseRequest {
    static handleError = (error: any): Promise<any> => {
        return Promise.reject(error);
    };
    static globalOptions: IRequestOptions;
    private emptyResponse: EmptyResponse;

    constructor() {
        this.emptyResponse = new EmptyResponse();
    }

    protected get options(): IRequestOptions {
        return BaseRequest.globalOptions || {
            getToken: (): string | null => null,
            onAuthError: (): void => console.warn("onAuthError is not set"),
        };
    }

    protected addTokenToHeaders(headers: any): any {
        const userToken = this.options.getToken();

        if (userToken != null) {
            return {...headers, "Authorization": `Bearer ${userToken}`} as any;
        } else {
            return headers;
        }
    }

    protected async fetch(url: string, config: any, isFullUrl?: boolean): Promise<any> {
        let isRequestError = false;
        let status: number | null = null;

        try {
            const headers = this.addTokenToHeaders({
                "Accept": "application/json",
                "Content-Type": "application/json",
            });

            const response = await fetch(isFullUrl == true ? url : this.createUrl(url), Object.assign({headers: headers}, config));

            status = response.status;
            if (response.status == 401) {
                this.options.onAuthError();

                throw new NoAuthError("No auth for " + url);
            } else if (response.status == 204) {
                return this.emptyResponse;
            } else if (!response.status || response.status < 200 || response.status >= 300) {
                isRequestError = true;

                throw await response.json();
            }

            return response;
        } catch (error) {
            if (isRequestError) {
                error.isServerError = true;
                console.warn(error, "Request error", {url, status});
                throw error;
            } else {
                console.log("Connection error", error);
                const connectionError: any = new Error(error.message);
                connectionError.name = ExceptionType.Connection;
                connectionError.innerError = error;
                connectionError.url = url;
                if (error.message == "Network request failed") {
                    connectionError.message = "Connection error";
                }
                throw connectionError;
            }
        }
    }

    protected createUrl(relativeUrl: string): string {
        return UrlHelper.create(relativeUrl, this.getUrl());
    }

    protected q(params: { [key: string]: string | number | boolean | string | Date | null }): string {
        const query = Object.keys(params)
            .filter(k => params[k] != null)
            .map(k => `${k}=${encodeURIComponent(assertNotNull(params[k]).toString())}`)
            .join("&");

        return query ? `?${query}` : "";
    }

    private getUrl(): string {
        return appSettingsProvider.settings.identityUrl;
    }
}

class EmptyResponse {
    public json(): any {
        return null;
    }
}
