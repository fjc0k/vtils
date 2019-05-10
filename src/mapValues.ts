import { AnyObject, EnumerableKey, forOwn } from './forOwn'

/**
 * 映射对象的可枚举属性值为一个新的值。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 * @returns 返回映射后的新对象
 */
export function mapValues<
  T extends AnyObject,
  K extends EnumerableKey<keyof T>,
  C
>(
  obj: T,
  callback: (value: T[K], key: K, obj: T) => C,
) {
  const newObj: { [key in K]: C } = {} as any
  forOwn(obj, (value: T[K], key: K, source: T) => {
    newObj[key] = callback(value, key, source)
  })
  return newObj
}
