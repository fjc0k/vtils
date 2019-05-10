/**
 * 检查 `value` 是否是原始有限数值。
 *
 * @param value 要检查的值
 * @returns `value` 是原始有限数值返回 `true`，否则返回 `false`
 */
export function isFinite(value: any): value is number {
  return Number.isFinite(value)
}
