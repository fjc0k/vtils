/**
 * 类型工具库。
 *
 * @packageDocumentation
 */

export type { LiteralUnion, AsyncReturnType, FixedLengthArray } from 'type-fest'

export type {
  AnyArray,
  ValueOf,
  AsyncOrSync,
  Buildable,
  Writable,
  Merge,
  Head,
  Tail,
  PickProperties as PickBy,
  OmitProperties as OmitBy,
  MarkOptional as PartialBy,
  MarkRequired as RequiredBy,
  StrictOmit as OmitStrict,
  DeepOmit as OmitDeep,
  DeepReadonly as ReadonlyDeep,
  DeepPartial as PartialDeep,
  DeepRequired as RequiredDeep,
  DeepWritable as WritableDeep,
  DeepNullable as NullableDeep,
  DeepNonNullable as NonNullableDeep,
} from 'ts-essentials'

// @index(['./**/*.ts', '!./**/*.test.*'], f => `export * from '${f.path}'`)
export * from './AnyFunction'
export * from './AnyObject'
export * from './Defined'
export * from './FirstParameter'
export * from './OneOrMany'
export * from './Path'
// @endindex
