/**
 * 检查 `value` 是否是一个字符串。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isString(value: any): value is string {
  return typeof value === 'string'
}
