export interface ISystemState {
    buildNumber: number;
    authToken: string | null;
    refreshToken: string | null;
}

export const SystemInitialState: ISystemState = {
    authToken: null,
    refreshToken: null,
    buildNumber: 1,
};