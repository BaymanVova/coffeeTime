import {assertNotNull} from "../assertNotNull";

export function getParamsFromProps<T>(props: INavParam<T>): T {
    const params = assertNotNull(props.navigation, "Navigation missing").state.params;

    return assertNotNull(params, "Navigation params missing");
}

export interface INavParam<T> {
    navigation: {state: {params?: T}};
}