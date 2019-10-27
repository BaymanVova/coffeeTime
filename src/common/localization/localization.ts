import LocalizedStrings from "react-native-localization";
import {dateLocalization} from "./dateLocalization";
import {commonLocalization} from "./commonLocalization";
import {pagesLocalization} from "./pagesLocalization";
import {emptyLocalization} from "./emptyLocalization";
import {errorsLocalization} from "./errorsLocalization";
import {DateHelper} from "../helpers/DateHelper";

class Localization {
    common = new LocalizedStrings(commonLocalization);
    date = new LocalizedStrings(dateLocalization);
    pages = new LocalizedStrings(pagesLocalization);
    empty = new LocalizedStrings(emptyLocalization);
    errors = new LocalizedStrings(errorsLocalization);

    getLanguage(): string {
        return this.common.getLanguage();
    }

    getInterfaceLanguage(): string {
        return this.common.getInterfaceLanguage();
    }

    setLanguage(language?: string | null): void {
        let localizationLanguage = language;

        if (localizationLanguage == null) {
            localizationLanguage = this.getLanguage();
        }

        const obj: any = this;

        for (const key of Object.keys(this)) {
            if (obj[key].setLanguage) {
                obj[key].setLanguage(localizationLanguage);
            }
        }

        DateHelper.setMomentLocale(localizationLanguage);
    }
}

export const localization = new Localization();