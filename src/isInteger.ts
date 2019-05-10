/**
 * 检查 `value` 是否是一个整数。
 *
 * @param value 要检查的值
 * @returns `value` 是整数返回 `true`，否则返回 `false`
 */
export function isInteger(value: any): value is number {
  return Number.isInteger(value)
}
