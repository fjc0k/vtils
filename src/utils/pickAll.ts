import { pick } from 'lodash-uni'

// https://github.com/sindresorhus/type-fest/issues/656
type IsEqual<A, B> = (<G>() => G extends A ? 1 : 2) extends <G>() => G extends B
  ? 1
  : 2
  ? true
  : false
type TupleToUnion<ArrayType> = ArrayType extends readonly unknown[]
  ? ArrayType[number]
  : never
type TupleOf<Tuple extends ReadonlyArray<Values>, Values> = IsEqual<
  Values,
  TupleToUnion<Tuple>
> extends true
  ? Tuple
  : never

// 过于卡顿
// https://github.com/microsoft/TypeScript/issues/13298#issuecomment-692864087
// type TupleUnion<U extends string, R extends string[] = []> = {
//   [S in U]: Exclude<U, S> extends never
//     ? [...R, S]
//     : TupleUnion<Exclude<U, S>, [...R, S]>
// }[U] &
//   string[]

/**
 * 选中对象中的所有类型上可见的属性并返回。
 *
 * @param data 对象
 * @param keys 属性列表
 */
export function pickAll<
  T extends Record<string, any>,
  K extends keyof T,
  Tuple extends ReadonlyArray<K>,
>(data: T, keys: TupleOf<Tuple, K>): T {
  return pick(data, keys as any) as any
}
