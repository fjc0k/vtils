import {AnyObject} from './enhanceType'
import {forOwn} from './forOwn'

/**
 * 返回 `obj` 自身可枚举属性值组成的数组。
 *
 * @param obj 要检索的对象
 * @returns 返回结果数组
 * @example
 * ```ts
 * values({ x: 1, 2: 'y' }) // => [1, 'y'] 或 ['y', 1]
 * ```
 */
export function values<T extends AnyObject>(obj: T) {
  const result: Array<T[Extract<keyof T, string | number>]> = []
  forOwn(obj, value => {
    result.push(value)
  })
  return result
}
