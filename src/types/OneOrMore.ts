/**
 * 同 `T | T[]`。
 *
 * @public
 * @example
 * ```typescript
 * type X = OneOrMore<number> // => number | number[]
 * ```
 */
export type OneOrMore<T> = T | T[]
