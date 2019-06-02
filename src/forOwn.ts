import { AnyObject } from './enhanceType'

export interface ForOwnTraverse<T extends AnyObject, K extends string | number = Extract<keyof T, string | number>> {
  /**
   * 遍历函数。
   *
   * @param value 值
   * @param key 键
   * @param obj 原对象
   * @returns 返回 `false` 可提前退出遍历
   */
  (value: T[K], key: K, obj: T): any,
}

/**
 * 遍历对象的可枚举属性。若遍历函数返回 `false`，遍历会提前退出。
 *
 * 注：基于你传入的 `obj`，遍历函数中 `key` 的类型可能为 `number`，
 * 但在运行时，`key` 始终为 `string`，
 * 因此，你应该始终把 `key` 当作 `string` 处理。
 * （为什么会这样？https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208）
 *
 * @param obj 要遍历的对象
 * @param traverse 遍历函数
 * @example
 * ```ts
 * forOwn(
 *   { x: '1', y: 2 },
 *   (value, key) => {
 *     console.log(key, value)
 *   }
 * )
 * ```
 */
export function forOwn<T extends AnyObject>(obj: T, traverse: ForOwnTraverse<T>) {
  for (const key in obj) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (traverse(obj[key], key as any, obj) === false) {
        break
      }
    }
  }
}
