/**
 * 检查 `value` 是否是 `null` 或 `undefined`。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export function isNil(value: any): value is null | undefined {
  return value == null
}
