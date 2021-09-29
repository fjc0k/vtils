/**
 * 立即调用函数并返回其返回值。
 *
 * 注：`ii = immediately invoke`
 *
 * @param fn 要调用的函数
 * @returns 返回被调用函数的返回值
 * @example
 * ```typescript
 * ii(() => 1) // => 1
 * ```
 */
export function ii<R, F extends () => R = () => R>(fn: F): R {
  return fn()
}
