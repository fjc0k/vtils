export type SumByIteratee<T = any> = (
  item: T,
  index: number,
) => number

/**
 * 根据 `iteratee` 返回的结果计算传入值的总和。
 *
 * @param array 传入的数组
 * @param iteratee 迭代函数
 * @returns 返回总和
 */
export function sumBy<T>(array: T[], iteratee: SumByIteratee<T>) {
  return array.reduce<number>(
    (total, item, index) => {
      total += iteratee(item, index)
      return total
    },
    0,
  )
}
