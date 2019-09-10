import {AnyObject} from './enhanceType'
import {forOwn} from './forOwn'

export interface MapValuesTraverse<T extends AnyObject, R, K extends string | number = Extract<keyof T, string | number>> {
  /**
   * 遍历函数。
   *
   * @param value 值
   * @param key 键
   * @param obj 原对象
   * @returns 返回新值
   */
  (value: T[K], key: K, obj: T): R,
}

/**
 * 映射对象的可枚举属性值为一个新的值。
 *
 * @param obj 要遍历的对象
 * @param traverse 遍历函数
 * @returns 返回映射后的新对象
 * @example
 * ```ts
 * mapValues(
 *   { x: 1, y: 2 },
 *   value => value + 10,
 * )
 * // => { x: 11, y: 12 }
 * ```
 */
export function mapValues<
  T extends AnyObject,
  R extends any,
>(
  obj: T,
  traverse: MapValuesTraverse<T, R>,
) {
  const newObj: Record<Extract<keyof T, string | number>, R> = {} as any
  forOwn(obj, (value, key, source) => {
    newObj[key] = traverse(value, key, source)
  })
  return newObj
}
