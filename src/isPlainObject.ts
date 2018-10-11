/**
 * 检查 value 是否是一个普通对象。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isPlainObject(value: any): value is object {
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
