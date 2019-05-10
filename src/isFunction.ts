export type AnyFunction = (...args: any[]) => any

/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns `value` 是函数返回 `true`，否则返回 `false`
 */
export function isFunction<T extends AnyFunction = AnyFunction>(value: any): value is T {
  return typeof value === 'function'
}
