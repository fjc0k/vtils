/**
 * 去除类型 T 中的 undefined。
 *
 * @public
 * @example
 * ```typescript
 * type X = string | undefined
 * type Y = Defined<X> // => string
 * ```
 */
export type Defined<T> = Exclude<T, undefined>
