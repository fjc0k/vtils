import { IsNever } from './IsNever.ts'

/**
 * 判断 `T` 是否是空对象。
 *
 * @public
 * @example
 * ```typescript
 * type X = IsEmptyObject<{}>
 * // => true
 * ```
 */
export type IsEmptyObject<T> = T extends Object ? IsNever<keyof T> : false
