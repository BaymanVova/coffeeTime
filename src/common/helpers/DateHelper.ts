import moment from "moment";
import {localization} from "../localization/localization";
/* tslint:disable:no-var-requires */
require("moment/locale/ru");

export class DateStringFormats {
    static simple = (separator: string): string => `MM${separator}DD${separator}YYYY`;
    static datePicker = "MMMM, D";
    static dayAndMonth = "D MMMM";
    static dateAndTime = "D.MM в HH:mm";
    static date = "D.MM";
    static time = "HH:mm";
    static year = "YYYY";
    static shortMonth = "MMM";
    static dayNumber = "DD";
    static monthAndYear = "MMM YYYY";
    static dayMonthYear = "D MMMM YYYY";
    static full = "YYYY-MM-DD HH:mm:ss";
    static yearDateTime = "YYYY-MM-DD HH:mm";
    static yearMonthDayBySub = "YYYY-MM-DD";
}

export class DateHelper {
    static fromStringOrNull(obj: string | Date | null | undefined): Date | null {
        if (obj == null) {
            return null;
        }
        if (obj instanceof Date) {
            return obj;
        }

        return new Date(obj);
    }

    static fromString(obj: string | Date): Date {
        if (obj instanceof Date) {
            return obj;
        }

        return new Date(obj);
    }

    static dateFromFormat(date: Date | null | undefined | string, format: string): string {
        let result = "";

        const _date: Date | null = DateHelper.fromStringOrNull(date);
        if (_date) {
            result = moment(_date).format(format).toLowerCase();
        }

        return result;
    }

    static prettyDate(date: Date | string, format: string): string {
        const diffInDays = moment().startOf("day").diff(moment(date).startOf("day"), "days");
        switch (diffInDays) {
            case -2:
                return localization.date.dayAfterTomorrow;
            case -1:
                return localization.date.tomorrow;
            case 0:
                return localization.date.today;
            case 1:
                return localization.date.yesterday;
            default:
                return DateHelper.dateFromFormat(date, format);
        }
    }

    static setMomentLocale(locale: string | undefined): void {
        moment.locale(locale)
    }
}