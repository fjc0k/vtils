import { isObject } from './isObject'

/**
 * 检查 `value` 是否像一个 `Promise`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `Promise` 返回 `true`，否则返回 `false`
 */
export function isPromise(value: any): value is Promise<any> {
  return (
    isObject(value)
      && typeof (value as any).then === 'function'
  )
}
