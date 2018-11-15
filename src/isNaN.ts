/**
 * 检查 `value` 是否是 `NaN`。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isNaN (value: any): boolean {
  return value !== value
}
