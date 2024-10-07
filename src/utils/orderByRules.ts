import { OneOrMore } from '../types'

export type OrderByRulesRuleObject<T> = {
  /**
   * 迭代函数。
   *
   * @param item 项目
   * @returns 返回参与排序计算的值
   */
  iteratee: (item: T) => any
  /**
   * 类型。
   */
  type: 'asc' | 'desc'
}

export type OrderByRulesRuleArray<T> = [
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
  type: 'asc' | 'desc',
]

export type OrderByRulesRule<T> =
  | OrderByRulesRuleObject<T>
  | OrderByRulesRuleArray<T>

/**
 * 允许指定一个或多个规则对数据进行排序。
 *
 * @param data 要排序的数据
 * @param rules 一个或多个规则
 * @returns 返回排序后的数据
 * @example
 * ```ts
 * orderByRules(
 *   ['x', 'xyz', 'xy'],
 *   {
 *     iteratee: item => item.length,
 *     type: 'desc',
 *   },
 * )
 * // => ['xyz', 'xy', 'x']
 * ```
 */
export function orderByRules<T>(
  data: T[],
  rules: OneOrMore<OrderByRulesRule<T>>,
): T[] {
  return (
    (Array.isArray(rules)
      ? typeof rules[0] === 'function'
        ? [rules]
        : rules
      : [rules]) as OrderByRulesRule<T>[]
  )
    .map<OrderByRulesRuleObject<T>>(rule =>
      Array.isArray(rule)
        ? {
            iteratee: rule[0],
            type: rule[1],
          }
        : rule,
    )
    .reduce<T[]>((orderedData, rule) => {
      const cachedKeys: T[] = []
      const cachedValues: any[] = []
      const cachedIteratee: OrderByRulesRuleObject<T>['iteratee'] = item => {
        const index = cachedKeys.indexOf(item)
        if (index === -1) {
          const value = rule.iteratee(item)
          cachedKeys.push(item)
          cachedValues.push(value)
          return value
        }
        return cachedValues[index]
      }

      const isAsc = rule.type === 'asc'

      orderedData.sort((a, b) => {
        a = cachedIteratee(a)
        b = cachedIteratee(b)
        return a === b ? 0 : a > b ? (isAsc ? 1 : -1) : isAsc ? -1 : 1
      })

      return orderedData
    }, data.slice())
}
