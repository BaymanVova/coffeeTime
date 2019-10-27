import {Platform, TextStyle, ViewStyle} from "react-native";
import {styleSheetCreate, styleSheetFlatten} from "../../common/utils";
import {Colors} from "./colors";
import {Fonts} from "./fonts";

export const CommonStyles = styleSheetCreate({
    flex1: {
        flex: 1
    } as ViewStyle,
    flexWhiteBackground: {
        flex: 1,
        backgroundColor: Colors.white
    } as ViewStyle,
    flexBlackBackground: {
        flex: 1,
        backgroundColor: Colors.black
    } as ViewStyle,
    shadow: {
        ...Platform.select({
            ios: {
                shadowOffset: {height: 3, width: 0},
                shadowOpacity: 0.16,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            }
        }),
    },
    shadow2: {
        ...Platform.select({
            ios: {
                shadowOffset: {height: 3, width: 0},
                shadowOpacity: 0.45,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            }
        }),
    },
    bottomEmptySpace: {
        height: 50,
        backgroundColor: Colors.white
    } as ViewStyle,
    iPhoneXFooter: {
        height: 20
    } as ViewStyle,
    windowContainer: {
        position: "absolute",
        paddingLeft: 30,
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 30,
        backgroundColor: Colors.white,
        left: 20,
        right: 20,
    } as ViewStyle,
    line: {
        borderBottomWidth: 1,
        borderColor: Colors.white,
    } as ViewStyle,
    rowCenter: {
        flexDirection: "row",
        alignItems: "center",
    } as ViewStyle,
});

const commonHeaderTitleStyle = {
    alignSelf: "center",
    textAlign: "center",
    fontSize: 22,
    fontFamily: Fonts.lobster,
    color: Colors.black,
} as TextStyle;

const defaultHeaderTitleStyle = {
    borderBottomWidth: 0,
    borderBottomColor: Colors.transparent,
    ...Platform.select({
        ios: {
            shadowRadius: 4,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 4},
        },
        android: {
            elevation: 8
        }
    }),
} as ViewStyle;

const commonHeaderStyle = {
    borderBottomWidth: 0,
    borderBottomColor: Colors.transparent,
    ...Platform.select({
        ios: {
            shadowRadius: 4,
            shadowOpacity: 0.3,
            shadowOffset: {width: 0, height: 4},
        },
        android: {
            elevation: 8
        }
    }),
} as ViewStyle;

export const CommonHeaderStyles = styleSheetCreate({
    headerTitleStyle: styleSheetFlatten(commonHeaderTitleStyle, {color: Colors.black}),
    headerStyle: styleSheetFlatten(commonHeaderStyle, {backgroundColor: Colors.black}),
    defaultHeaderStyle: styleSheetFlatten(defaultHeaderTitleStyle, {backgroundColor: Colors.white}),
});
