import isObject from './isObject'

export interface ForOwnObj { [key: string]: any }
export type ForOwnCallback<T extends ForOwnObj> = (value: T[Extract<keyof T, string>], key: Extract<keyof T, string>, obj: T) => any

/**
 * 遍历对象的可枚举属性。若回调函数返回 false，遍历会提前退出。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 */
export default function forOwn<T extends ForOwnObj>(obj: T, callback: ForOwnCallback<T>): void {
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
