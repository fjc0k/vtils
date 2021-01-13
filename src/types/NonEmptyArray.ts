/**
 * 非空数组类型。
 *
 * @public
 * @example
 * ```typescript
 * type X = NonEmptyArray<number>
 * const x: X = [] // => error
 * ```
 */
export type NonEmptyArray<T> = [T, ...T[]]
