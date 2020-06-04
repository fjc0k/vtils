/**
 * 去除类型 T 中的 undefined。
 *
 * @public
 */
export type Defined<T> = Exclude<T, undefined>
