import {IAppSettings} from "./appSettings";
// tslint:disable:no-var-requires
const getSettings = require("./getSettings").getSettings;

class AppSettingsProvider {
    private _settings: IAppSettings;

    get settings(): IAppSettings {
        if (!this._settings) {
            this._settings = getSettings();

            this.settings.devOptions.disableReduxLogger = this._settings.devOptions.disableReduxLogger || typeof atob === "undefined";
        }

        return this._settings;
    }
}

export const appSettingsProvider = new AppSettingsProvider();
