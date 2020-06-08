/**
 * 同 `T | T[]`。
 *
 * @public
 * @example
 * ```typescript
 * type X = OneOrMany<number> // => number | number[]
 * ```
 */
export type OneOrMany<T> = T | T[]
