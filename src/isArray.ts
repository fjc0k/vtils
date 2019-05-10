/**
 * 检查 `value` 是否是一个数组。
 *
 * @param value 要检查的值
 * @returns `value` 是数组返回 `true`，否则返回 `false`
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
