/**
 * 检查 value 是否是一个对象。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isObject(value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
