import {AnyObject} from './enhanceType'
import {forOwn} from './forOwn'

/**
 * 创建一个 `data` 对象自身可枚举属性的键值对数组，但不保证每次创建的数组顺序一致。
 *
 * @param data 数据对象
 * @returns 返回键值对数组
 * @example
 * ```ts
 * entries({
 *   x: 1,
 *   y: 2,
 * }) // => [['x', 1], ['y', 2]]
 * ```
 */
export function entries<T extends AnyObject>(data: T): Array<[keyof T, T[keyof T]]> {
  if (Object['entries']) {
    return Object['entries'](data)
  }
  const result: Array<[keyof T, T[keyof T]]> = []
  forOwn(data, (value, key) => {
    result.push([key, value])
  })
  return result
}
