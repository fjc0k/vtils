import isObject from './isObject'

export type ForOwnCallback<
  T,
  K extends keyof T
> = (
  value: T[K],
  key: K,
  obj: T
) => any

/**
 * 遍历对象的可枚举属性。若回调函数返回 false，遍历会提前退出。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 */
export default function forOwn<
  T extends object,
  K extends keyof T
>(obj: T, callback: ForOwnCallback<T, K>): void {
  if (isObject(obj)) {
    let key: K // tslint:disable-line
    for ((key as any) in obj) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (callback(obj[key], key, obj) === false) {
          break
        }
      }
    }
  }
}
