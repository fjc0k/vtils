/**
 * 检查 `value` 是否是一个数字。
 *
 * @param value 要检查的值
 * @returns `value` 是数字返回 `true`，否则返回 `false`
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number'
}
