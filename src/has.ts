/**
 * 检查 key 是否是 obj 自身的属性。
 *
 * @param obj 要检查的对象
 * @param key 要检查的键
 * @returns 是（true）或否（false）
 */
export default function has(obj: object, key: string): boolean {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key)
}
