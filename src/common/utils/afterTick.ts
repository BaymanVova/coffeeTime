import {InteractionManager} from "react-native";

export function afterTick(action: () => void): number {
    return setTimeout(() => InteractionManager.runAfterInteractions(action), 0);
}