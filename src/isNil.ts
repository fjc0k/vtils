/**
 * 检查 value 是否是 null 或 undefined。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isNil(value: any): boolean {
  return value == null
}
