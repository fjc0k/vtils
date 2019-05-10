/**
 * 检查 `value` 是否等于 `undefined`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `undefined` 返回 `true`，否则返回 `false`
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}
