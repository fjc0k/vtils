import { includes } from './includes'

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
  return arr.reduce<T[]>(
    (result, item) => {
      if (!includes(result, item)) {
        result.push(item)
      }
      return result
    },
    [],
  )
}
