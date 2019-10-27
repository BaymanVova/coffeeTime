export function values<T extends Object>(object: T, removedKeys?: (keyof T)[]): T[keyof T][] {
    const result = [];
    const isHaveToRemove = removedKeys != null && removedKeys.length != 0;
    for (const key in object) {
        if ((!isHaveToRemove || removedKeys!.indexOf(key) == -1) && object.hasOwnProperty(key)) {
            result.push(object[key]);
        }
    }

    return result;
}

export function entries<T extends {[key: string]: any}>(object: T, removedKeys?: (keyof T)[]): [string, T[keyof T]][] {
    const result = [];
    const isHaveToRemove = removedKeys != null && removedKeys.length != 0;
    for (const key in object) {
        if ((!isHaveToRemove || removedKeys!.indexOf(key) == -1) && object.hasOwnProperty(key)) {
            result.push([key, object[key]] as [string, T[keyof T]]);
        }
    }

    return result;
}

export function forEach<T extends Object>(object: T, func: (key: keyof T) => void): void {
    for (const key in object) {
        if (object.hasOwnProperty(key)) {
            func(key);
        }
    }
}