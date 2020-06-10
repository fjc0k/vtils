/**
 * 检查 `value` 是否像 `Promise`。
 *
 * @param value 要检查的值
 * @returns 返回检查结果
 * @example
 * ```typescript
 * isPromiseLike(Promise.resolve()) // => true
 * ```
 */
export function isPromiseLike(value: any): value is PromiseLike<any> {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as any).then === 'function'
  )
}
