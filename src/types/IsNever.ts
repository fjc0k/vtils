/**
 * 判断 `T` 是否是 `never` 类型。
 *
 * @public
 * @example
 * ```typescript
 * type X = IsNever<never>
 * // => true
 * ```
 */
export type IsNever<T> = [T] extends [never] ? true : false
