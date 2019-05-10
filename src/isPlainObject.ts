/**
 * 检查 `value` 是否是一个普通对象。
 *
 * @param value 要检查的值
 * @returns `value` 是普通对象返回 `true`，否则返回 `false`
 */
export function isPlainObject(value: any): value is Record<keyof any, any> {
  if (!value || typeof value !== 'object') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  const Ctor = proto.constructor
  return typeof Ctor === 'function' && Ctor instanceof Ctor
}
