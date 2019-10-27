export interface IRegistrationState {
    isRegistration: boolean;
    error: string;
}

export const RegInitialState: IRegistrationState = {
    isRegistration: false,
    error: "",
}
