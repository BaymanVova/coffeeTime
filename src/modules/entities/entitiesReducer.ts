import {reducerWithInitialState} from "typescript-fsa-reducers";
import {newState} from "../../common/newState";
import {CoreActions} from "../../core/store";
import {IAppState} from "../../core/store/appState";
import {EntitiesInitialState, IEntitiesState} from "./entitiesState";
import {AvailableLanguages} from "../../types/interfaces";
import {localization} from "../../common/localization/localization";
import {EntitiesActions} from "./entitiesActions";

function rehydrateHandler(state: IEntitiesState, rehydratedState: IAppState): IEntitiesState {
    const nState = rehydratedState.entities || state;

    return newState(nState, {
        language: nState.language || localization.getLanguage() as AvailableLanguages,
    });
}

function setLanguageHandler(state: IEntitiesState, language: AvailableLanguages): IEntitiesState {
    return newState(state, {language});
}

export const entitiesReducer = reducerWithInitialState(EntitiesInitialState)
    .case(CoreActions.rehydrate, rehydrateHandler)
    .case(EntitiesActions.setLanguage, setLanguageHandler)
    .build();
