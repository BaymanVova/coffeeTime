import {AvailableLanguages} from "../../types/interfaces";

export interface IEntitiesState {
    language: AvailableLanguages | null;
    user: any | null;
}

export const EntitiesInitialState: IEntitiesState = {
    language: null,
    user: null,
};