import {Alert} from "react-native";
import {localization} from "../localization/localization";

export function showInDevAlert(): void {
    Alert.alert(localization.empty.inDevTitle, localization.empty.inDevMessage);
}