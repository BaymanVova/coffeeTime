import React, {Component} from "react";
import {TouchableWithoutFeedback, View, ViewStyle} from "react-native";
import {appSettingsProvider} from "../../core/settings";
import {Ref, styleSheetCreate} from "../utils";
import {IPopupMenuAction, PopupMenu} from "./PopupMenu";

interface IProps {
    onPress: (phone: string, password: string) => void;
    children: JSX.Element;
}

export class TestUsers extends Component<IProps> {
    private testUsersActions: IPopupMenuAction[];
    private testUsers = [
        {phone: "test_user", password: "qwerty"},
        {phone: "another_user", password: "qwerty"},
    ];
    private menu = new Ref<PopupMenu>();
    private showMenu = (): void => this.menu.ref.show();

    constructor(props: IProps) {
        super(props);
        this.testUsersActions = this.testUsers.map(
            (i) =>
                ({
                    action: (): void => this.props.onPress(i.phone, i.password),
                    name: i.phone,
                } as IPopupMenuAction),
        );
    }

    render(): JSX.Element | null {
        if (appSettingsProvider.settings.environment == "Production") {
            return null;
        } else {
            return (
                <View style={styles.container}>
                    <TouchableWithoutFeedback onPress={this.showMenu}>
                        <View style={styles.buttonStyle}>
                            <PopupMenu actions={this.testUsersActions} ref={this.menu.handler}/>
                            {this.props.children}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        }
    }
}

const styles = styleSheetCreate({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    } as ViewStyle,
    buttonStyle: {padding: 10} as ViewStyle,
});
