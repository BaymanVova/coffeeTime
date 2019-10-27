import {localization} from "../localization/localization";

export class AuthHelper {
    static checkAuthParams(params: {phone: string, password: string}): void {
        const phone = this.isPhone(params.phone);
        const password = this.checkPassword(params.password);

        if (phone != null || password != null) {
            throw {message: {phone: [phone], password: [password]}};
        }
    }

    static checkEmail(email: string): void {
        const emailError = this.isEmail(email);

        if (emailError != null) {
            throw new Error(emailError);
        }
    }

    static checkPhone(phone: string): void {
        const phoneError = this.isPhone(phone);

        if (phoneError != null) {
            throw new Error(phoneError);
        }
    }

    static isPhone(phone: string): string | null {
        return phone.length < 10 ? localization.errors.invalidPhone : null;
    }

    static isEmail(login: string): string | null {
        //tslint:disable
        if (login == "") {
            return localization.errors.error;
        }

        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const regexTest = emailRegex.test(login);

        if (!regexTest) {
            return localization.errors.invalidEmail;
        }

        return null;
    }

    static checkPassword(password: string): string | null {
        return password.length < 6 ? localization.errors.invalidPassword : null;
    }
}