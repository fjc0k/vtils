export interface GroupByIteratee<T, K> {
  /**
   * 迭代函数。
   *
   * @param item 数据项
   * @param index 数据项的索引
   * @returns 返回在分组结果中的键
   */
  (item: T, index: number, data: T[]): K,
}

/**
 * 根据 `iteratee` 返回的值对 `data` 进行分组。
 *
 * @param data 要分组的数据
 * @param iteratee 迭代函数
 * @returns 返回分组结果
 * @example
 * ```ts
 * groupBy(
 *   [
 *     { type: 1, name: '石头' },
 *     { type: 3, name: '花生' },
 *     { type: 2, name: '鲸鱼' },
 *     { type: 1, name: '树木' },
 *     { type: 2, name: '鲨鱼' },
 *   ],
 *   item => item.type,
 * )
 * // => {
 * // =>   1: [
 * // =>     { type: 1, name: '石头' },
 * // =>     { type: 1, name: '树木' },
 * // =>   ],
 * // =>   2: [
 * // =>     { type: 2, name: '鲸鱼' },
 * // =>     { type: 2, name: '鲨鱼' },
 * // =>   ],
 * // =>   3: [
 * // =>     { type: 3, name: '花生' },
 * // =>   ],
 * // => }
 * ```
 */
export function groupBy<T, K extends keyof any>(
  data: T[],
  iteratee: GroupByIteratee<T, K>,
) {
  return data.reduce<Record<K, T[]>>(
    (res, item, index) => {
      const key = iteratee(item, index, data)
      if (!res[key]) {
        res[key] = []
      }
      res[key].push(item)
      return res
    },
    {} as any,
  )
}
