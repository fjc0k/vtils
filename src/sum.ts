import {isArray} from './is'

/**
 * 计算传入值的总和。
 *
 * @param numbers 传入的数字
 * @returns 返回传入值的总和
 * @example
 * ```ts
 * sum([1, 2, 3]) // => 6
 * ```
 */
export function sum(...numbers: Array<number | number[]>) {
  return numbers.reduce<number>(
    (total, number) => {
      total += isArray(number) ? sum(...number) : number
      return total
    },
    0,
  )
}

export interface SumByIteratee<T = any> {
  /**
   * 迭代函数。
   *
   * @param item 单项
   * @param index 索引
   * @param arr 原数组
   * @returns 返回参与计算总和的数值
   */
  (item: T, index: number, arr: T[]): number,
}

/**
 * 根据 `iteratee` 返回的结果计算传入值的总和。
 *
 * @param array 传入的数组
 * @param iteratee 迭代函数
 * @returns 返回总和
 * @example
 * ```ts
 * sumBy(
 *   [
 *     { count: 1 },
 *     { count: 2 },
 *     { count: 3 },
 *   ],
 *   item => item.count,
 * )
 * // => 6
 * ```
 */
export function sumBy<T>(array: T[], iteratee: SumByIteratee<T>) {
  return array.reduce<number>(
    (total, item, index) => {
      total += iteratee(item, index, array)
      return total
    },
    0,
  )
}
