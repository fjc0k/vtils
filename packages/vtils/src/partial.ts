import {AnyObject} from './enhanceType'

/**
 * TypeScript 中 `Partial` 的函数版本。
 *
 * @param obj 要 `Partial` 的对象
 * @returns 原封不动地返回对象，但对其类型进行了 `Partial` 操作
 * @example
 * ```ts
 * partial({ x: 1 } as const) // => { x?: number }
 * ```
 */
export function partial<T extends AnyObject>(obj: T): Partial<T> {
  return obj as any
}
