/**
 * 检查 `value` 是否是原始有限数值。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isFinite(value: any): value is number {
  return Number.isFinite(value)
}
