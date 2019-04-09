import { AnyObject } from './forOwn'
import { reduce } from './reduce'

/**
 * 将 obj 转换为查询字符串。
 *
 * @param obj 要转换的对象
 * @returns 查询字符串
 */
export function objectToQueryString(obj: AnyObject): string {
  return reduce(
    obj,
    (result, value, key) => {
      result.push(`${encodeURIComponent(key.toString())}=${encodeURIComponent(value)}`)
      return result
    },
    [],
  ).join('&')
}
