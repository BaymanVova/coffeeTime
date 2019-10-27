/*tslint:disable*/

// @ts-ignore
import Intl from "intl";
import "intl/locale-data/jsonp/en";

export function formatPrice(price: number | string): string {
    return formatter.format(price);
}

export function formatDigits(price: number): string {
    return digitFormatter.format(price);
}

const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
});

const digitFormatter = new Intl.NumberFormat("en", {
    style: "decimal",
    minimumFractionDigits: 0,
});