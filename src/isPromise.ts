import isObject from './isObject'

/**
 * 检查 `value` 是否像一个 `Promise`。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isPromise(value: any): value is Promise<any> {
  return isObject(value) && typeof (value as any).then === 'function'
}
