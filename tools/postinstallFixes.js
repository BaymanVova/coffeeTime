const dir = __dirname;
const path = require("path");
const replaceInFile = require("./replaceInFile");

preventBundleInDebugForIOS();
preventRunReactPackagerIOS();

function preventRunReactPackagerIOS() {
    console.log("preventRunReactPackagerIOS");
    const file = path.join(dir, "..", "node_modules", "react-native", "React", "React.xcodeproj", "project.pbxproj");

    replaceInFile(file, [
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"],
        ["if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" ] ;", "if [ -z \\\"${RCT_NO_LAUNCH_PACKAGER+xxx}\\\" AND 0] ;"]
    ]);
}

function preventBundleInDebugForIOS() {
    console.log("preventBundleInDebugForIOS");
    const file = path.join(dir, "..", "node_modules", "react-native", "scripts", "react-native-xcode.sh");

    replaceInFile(file, /"\$PLATFORM_NAME" == \*simulator/g, "\"\$PLATFORM_NAME\"")
}