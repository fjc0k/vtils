/**
 * 根据 `iteratee` 返回的结果计算传入值的总和。
 *
 * @param array 传入的数组
 * @param iteratee 迭代函数
 * @returns 总和
 */
export default function sumBy<T>(array: T[], iteratee: (item: T) => number): number {
  return array.reduce<number>((total, item) => {
    total += iteratee(item)
    return total
  }, 0)
}
