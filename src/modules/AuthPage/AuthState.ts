export interface IAuthState {
    isAuthorizing: boolean;
    error: string | null;
}

export const AuthInitialState: IAuthState = {
    isAuthorizing: false,
    error: null,
};
