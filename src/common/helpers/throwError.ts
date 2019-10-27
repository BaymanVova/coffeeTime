export function throwError(errorMessage: any): void {
    const error = new Error();
    error.message = errorMessage;
    throw error;
}