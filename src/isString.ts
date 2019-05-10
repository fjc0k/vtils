/**
 * 检查 `value` 是否是一个字符串。
 *
 * @param value 要检查的值
 * @returns `value` 是字符串返回 `true`，否则返回 `false`
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}
