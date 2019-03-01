import get from './get'
import { ToPathValue } from './toPath'

/**
 * 根据 `iteratee` 对 `arr` 进行分组。
 *
 * @param arr 要分组的数据
 * @param iteratee 迭代值，字符串或数字表示键路径，函数表示以该函数生成 `key`
 * @returns 分组结果
 */
export default function groupBy<T>(
  arr: T[],
  iteratee: ToPathValue | ((item: T, index: number) => any),
): { [key: string]: T[] } {
  const iterateeIsFunction = typeof iteratee === 'function'
  return arr.reduce<{ [key: string]: T[] }>((res, item, index) => {
    const key = iterateeIsFunction
      ? (iteratee as any)(item, index)
      : get(item as any, iteratee as any)
    if (!res[key]) {
      res[key] = []
    }
    res[key].push(item)
    return res
  }, {})
}
