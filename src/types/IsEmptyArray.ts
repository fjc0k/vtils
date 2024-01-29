import { NonEmptyArray } from './NonEmptyArray.ts'

/**
 * 判断 `T` 是否是空数组。
 *
 * @public
 * @example
 * ```typescript
 * type X = IsEmptyArray<[]>
 * // => true
 * ```
 */
export type IsEmptyArray<T> = T extends any[]
  ? T extends NonEmptyArray<any>
    ? false
    : true
  : false
