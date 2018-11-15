/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isFunction (value: any): value is (...args: any) => any {
  return typeof value === 'function'
}
