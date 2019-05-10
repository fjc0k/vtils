/**
 * 检查 `value` 是否是 `null`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `null` 返回 `true`，否则返回 `false`
 */
export function isNull(value: any): value is null {
  return value === null
}
