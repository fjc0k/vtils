export interface KeyByIteratee<T, K> {
  /**
   * 迭代函数。
   *
   * @param item 数据项
   * @param index 数据项的索引
   * @returns 返回在分组结果中的键
   */
  (item: T, index: number): K,
}

/**
 * 根据 `iteratee` 返回的键对 `data` 进行分组，但只保留最后一个结果。
 *
 * @param data 要分组的数据
 * @param iteratee 迭代函数
 * @returns 返回分组结果
 */
export function keyBy<T extends any, K extends keyof any>(
  data: T[],
  iteratee: KeyByIteratee<T, K>,
) {
  return data.reduceRight<Record<K, T>>(
    (res, item, index) => {
      const key = iteratee(item, index)
      if (!Object.prototype.hasOwnProperty.call(res, key)) {
        res[key] = item
      }
      return res
    },
    {} as any,
  )
}
