import {AnyObject, PartialBy} from './enhanceType'

/**
 * TypeScript 中 `PartialBy` 的函数版本。
 *
 * @param obj 要 `PartialBy` 的对象
 * @returns 原封不动地返回对象，但对其类型进行了 `PartialBy` 操作
 * @example
 * ```ts
 * partialBy(
 *   { x: 1, y: 2 } as const,
 *   ['x'],
 * ) // => { x?: number, y: number }
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function partialBy<T extends AnyObject, K extends keyof T>(obj: T, keys: K[]): PartialBy<T, K> {
  return obj as any
}
