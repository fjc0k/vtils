/**
 * 将一个数组或一个对象归纳为一个值。
 *
 * @param data 待归纳的数组或对象
 * @param fn 归纳函数
 * @param initialValue 归纳初始值
 * @returns 归纳最终值
 */
declare function reduce<T, K extends number, R>(data: ReadonlyArray<T>, fn: (accumulator: R, currentValue: T, currentKey: K) => R, accumulator: R): R;
declare function reduce<T extends object, K extends keyof T, R>(data: T, fn: (accumulator: R, currentValue: T[K], currentKey: K) => R, accumulator: R): R;
export default reduce;
