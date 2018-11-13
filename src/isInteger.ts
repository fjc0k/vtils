/**
 * 检查 `value` 是否是一个整数。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isInteger(value: any): value is number {
  return Number.isInteger(value)
}
