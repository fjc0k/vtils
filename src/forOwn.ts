import isObject from './isObject'

/**
 * 遍历对象的可枚举属性。若回调函数返回 false，遍历会提前退出。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 */
export default function forOwn<
  T extends { [key: string]: any },
  K extends keyof T,
>(obj: T, callback: (value: T[K], key: K, obj: T) => any): void {
  if (!isObject(obj)) return
  for (const key in obj) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (callback(obj[key], key as any, obj) === false) {
        break
      }
    }
  }
}
