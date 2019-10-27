import {isIos} from "./common";

export class Fonts {
    static regular = isIos ? "SFProText-Regular" : "Roboto-Regular";
    static light = isIos ? "SF-UI-Text-Light" : "Roboto-Light";
    static bold = isIos ? "SF-UI-Text-Bold" : "Roboto-Bold";
    static lobster = "Lobster-Regular";
}
