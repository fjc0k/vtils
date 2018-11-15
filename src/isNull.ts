/**
 * 检查 `value` 是否等于 `null`。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isNull(value: any): value is null {
  return value === null
}
