function reduce<T, K extends number, R>(
  data: ReadonlyArray<T>,
  fn: (accumulator: R, currentValue: T, currentKey: K) => R,
  accumulator: R
): R

function reduce<T extends object, K extends keyof T, R>(
  data: T,
  fn: (accumulator: R, currentValue: T[K], currentKey: K) => R,
  accumulator: R
): R

/**
 * 将一个数组或一个对象归纳为一个值。
 *
 * @param data 待归纳的数组或对象
 * @param fn 归纳函数
 * @param initialValue 归纳初始值
 * @returns 归纳最终值
 */
function reduce(data: any, fn: any, accumulator: any): any {
  if (Array.isArray(data)) {
    return data.reduce(fn, accumulator)
  } else {
    return Object.keys(data).reduce((localAccumulator, key) => {
      return fn(localAccumulator, data[key], key)
    }, accumulator)
  }
}

export default reduce
