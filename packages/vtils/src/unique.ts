import {includes} from './includes'

/**
 * 将给定的数组去重后返回。
 *
 * @param arr 要去重的数组
 * @returns 返回去重后的数组
 * @example
 * ```ts
 * unique([1, 2, 1, 3]) // => [1, 2, 3]
 * ```
 */
export function unique<T>(arr: T[]): T[] {
  const result: T[] = []
  for (const item of arr) {
    if (!includes(result, item)) {
      result.push(item)
    }
  }
  return result
}

/**
 * 通过 `iteratee` 返回的值将给定的数组去重后返回。
 *
 * @param arr 要去重的数组
 * @param iteratee 迭代函数
 * @returns 返回去重后的数组
 * @example
 * ```ts
 * uniqueBy([1, 2, 1, 3], item => item < 3) // => [1, 3]
 * ```
 */
export function uniqueBy<T>(arr: T[], iteratee: (item: T, index: number, arr: T[]) => any): T[] {
  const found: Record<any, boolean> = Object.create(null)
  const result: T[] = []
  for (let i = 0, len = arr.length; i < len; i++) {
    const value = iteratee(arr[i], i, arr)
    if (!(value in found)) {
      found[value] = true
      result.push(arr[i])
    }
  }
  return result
}
