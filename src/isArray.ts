/**
 * 检查 `value` 是否是一个数组。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
