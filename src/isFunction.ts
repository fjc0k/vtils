export type AnyFunction = (...args: any[]) => any

/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export function isFunction<T extends AnyFunction = AnyFunction>(value: any): value is T {
  return typeof value === 'function'
}
