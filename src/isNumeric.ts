/**
 * 检查 value 是否是一个数值。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isNumeric(value: any): boolean {
  return value != null && !isNaN(value - parseFloat(value))
}
