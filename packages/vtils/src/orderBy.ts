import {castArray} from './castArray'
import {OneOrMore} from './enhanceType'

export enum OrderByRuleType {
  /** 降序 */
  desc = 'desc',
  /** 升序 */
  asc = 'asc',
}

export type OrderByRule<T> = {
  /**
   * 迭代函数。
   *
   * @param item 项目
   * @returns 返回参与排序计算的值
   */
  iteratee: (item: T) => any,
  /**
   * 类型。
   */
  type: OrderByRuleType,
}

/**
 * 允许指定一个或多个规则对数据进行排序。
 *
 * @param data 要排序的数据
 * @param rules 一个或多个规则
 * @returns 返回排序后的数据
 * @example
 * ```ts
 * orderBy(
 *   ['x', 'xyz', 'xy'],
 *   {
 *     iteratee: item => item.length,
 *     type: OrderByRuleType.desc,
 *   },
 * )
 * // => ['xyz', 'xy', 'x']
 * ```
 */
export function orderBy<T>(data: T[], rules: OneOrMore<OrderByRule<T>>): T[] {
  return castArray(rules).reduce<T[]>(
    (orderedData, rule) => {
      const cachedKeys: T[] = []
      const cachedValues: any[] = []
      const cachedIteratee: OrderByRule<T>['iteratee'] = item => {
        const index = cachedKeys.indexOf(item)
        if (index === -1) {
          const value = rule.iteratee(item)
          cachedKeys.push(item)
          cachedValues.push(value)
          return value
        }
        return cachedValues[index]
      }

      const isAsc = rule.type === OrderByRuleType.asc

      orderedData.sort((a, b) => {
        a = cachedIteratee(a)
        b = cachedIteratee(b)

        return a === b ? 0 : (
          a > b
            ? (isAsc ? 1 : -1)
            : (isAsc ? -1 : 1)
        )
      })

      return orderedData
    },
    data.slice(),
  )
}
