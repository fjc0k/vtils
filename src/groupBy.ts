export type GroupByIteratee<T, K> = (item: T, index: number) => K

/**
 * 根据 `iteratee` 对 `arr` 进行分组。
 *
 * @param arr 要分组的数据
 * @param iteratee 迭代函数
 * @returns 返回分组结果
 */
export function groupBy<T, K extends keyof any>(
  arr: T[],
  iteratee: GroupByIteratee<T, K>,
) {
  return arr.reduce<Record<K, T[]>>(
    (res, item, index) => {
      const key = iteratee(item, index)
      if (!res[key]) {
        res[key] = []
      }
      res[key].push(item)
      return res
    },
    {} as any,
  )
}
