export function assertNotNull<T>(item: T | null | undefined, message?: string): T {
    if (item == null) {
        message = message ? message : "";
        throw new Error("Object can not be null." + message);
    }

    return item;
}
