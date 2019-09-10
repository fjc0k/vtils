import {AnyObject, LiteralUnion} from './enhanceType'

/**
 * 返回 `obj` 的可枚举属性组成的数组。
 *
 * 注：基于你传入的 `obj`，返回的 `key` 的类型可能为 `number`，
 * 但在运行时，`key` 始终为 `string`，
 * 因此，你应该始终把 `key` 当作 `string` 处理。
 * （为什么会这样？https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208）
 *
 * @param obj 对象
 * @returns 返回结果数组
 * @example
 * ```ts
 * keys({ x: 1, 2: 'y' }) // => ['x', '2'] 或 ['2', 'x']
 * ```
 */
export function keys<T extends AnyObject>(obj: T) {
  return Object.keys(obj) as Array<
  LiteralUnion<
  Extract<keyof T, string | number>,
  string | number
  >
  >
}
