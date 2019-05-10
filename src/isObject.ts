/**
 * 检查 `value` 是否是一个对象。
 *
 * @param value 要检查的值
 * @returns `value` 是对象返回 `true`，否则返回 `false`
 */
export function isObject(value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
