/**
 * 检查 value 是否是一个布尔值。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}
