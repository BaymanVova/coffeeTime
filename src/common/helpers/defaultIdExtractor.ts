export function defaultIdExtractor<T extends {id: any}>(item: T): string {
    if (typeof item.id == "string") {
        return item.id;
    } else {
        return item.id.toString();
    }
}