/**
 * 检查 `value` 是否是一个数值。
 *
 * @param value 要检查的值
 * @returns `value` 是数值返回 `true`，否则返回 `false`
 */
export function isNumeric(value: any): value is number | string {
  return value != null && !isNaN(value - parseFloat(value))
}
