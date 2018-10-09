declare function reduce<T, K extends number, R>(data: ReadonlyArray<T>, fn: (accumulator: R, currentValue: T, currentKey: K) => R, accumulator: R): R;
declare function reduce<T extends object, K extends keyof T, R>(data: T, fn: (accumulator: R, currentValue: T[K], currentKey: K) => R, accumulator: R): R;
export default reduce;
