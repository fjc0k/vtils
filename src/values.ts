import { AnyObject, EnumerableKey, forOwn } from './forOwn'

/**
 * 返回 `obj` 自身可枚举属性的值为数组。
 *
 * @param obj 要检索的对象
 * @returns 返回结果数组
 */
export function values<T extends AnyObject>(obj: T) {
  const result: Array<T[EnumerableKey<keyof T>]> = []
  forOwn(obj, value => {
    result.push(value)
  })
  return result
}
