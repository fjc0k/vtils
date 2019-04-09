/**
 * 根据 `iteratee` 对 `arr` 进行分组，但只保留最后一个结果。
 *
 * @param arr 要分组的数据
 * @param iteratee 生成 `key` 的迭代函数
 * @returns 分组结果
 */
export function keyBy<T extends any, K extends keyof any>(
  arr: T[],
  iteratee: (item: T, index: number) => K,
) {
  return arr.reduce<{ [key in K]: T }>(
    (res, item, index) => {
      const key = iteratee(item, index)
      res[key] = item
      return res
    },
    {} as any,
  )
}
