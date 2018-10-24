import isObject from './isObject'

export type ForOwnCallback<
  T,
  R = any
> = (
  value: T[keyof T],
  key: keyof T,
  obj: T
) => R

/**
 * 遍历对象的可枚举属性。若回调函数返回 false，遍历会提前退出。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 */
export default function forOwn<T extends object>(obj: T, callback: ForOwnCallback<T>): void {
  if (isObject(obj)) {
    for (const key in obj) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (callback(obj[key], key, obj) === false) {
          break
        }
      }
    }
  }
}
