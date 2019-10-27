import {NativeSyntheticEvent, TextInput, TextInputContentSizeChangeEventData, TextStyle} from "react-native";
import React, {PureComponent} from "react";
import {styleSheetFlatten} from "../utils";

interface IProps {
    maxHeight: number;
    minHeight?: number;
    style?: TextStyle;
    placeholder?: string;
    onChangeText?: (text: string) => void;
    value?: string;
    maxLength?: number;
    editable?: boolean;
}

interface IState {
    height: number | undefined;
    isFocused: boolean;
}

export class AutoGrowTextInput extends PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {height: this.props.minHeight || undefined, isFocused: false};
    }

    private _onContentSizeChange = (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>): void => {
        const height = this._calcHeight(event.nativeEvent.contentSize.height);

        if (height == this.state.height) {
            return;
        }
        this.setState({height});
    };

    private _calcHeight(actualHeight: number): number {
        return Math.max(Math.min(this.props.maxHeight, actualHeight), this.props.minHeight || 0);
    }

    render(): JSX.Element {
        const {value, style, onChangeText, placeholder, maxLength, editable} = this.props;
        const height = this.state.height;

        return (
            <TextInput
                value={value}
                autoFocus={true}
                underlineColorAndroid="transparent"
                multiline={true}
                blurOnSubmit={false}
                onChangeText={onChangeText}
                style={styleSheetFlatten(style, {height})}
                placeholder={placeholder}
                onContentSizeChange={this._onContentSizeChange}
                maxLength={maxLength}
                editable={editable}
            />
        );
    }
}