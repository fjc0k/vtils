import { LiteralUnion } from './enhanceType'

/**
 * 检查 `key` 是否是对象 `obj` 自身的属性。
 *
 * @param obj 要检查的对象
 * @param key 要检查的键
 * @returns `key` 是 `obj` 自身的属性返回 `true`，否则返回 `false`
 */
export function has<T>(
  obj: T,
  key: LiteralUnion<
    T extends any[] ? never : keyof T,
    string | number | symbol
  >,
): boolean {
  return obj != null && Object.prototype.hasOwnProperty.call(obj, key)
}
