/**
 * 类型工具库。
 *
 * @packageDocumentation
 */

/* istanbul ignore file */

export type {
  LiteralUnion,
  AsyncReturnType,
  FixedLengthArray,
  PackageJson,
  TsConfigJson,
  JsonValue,
  JsonArray,
  JsonObject,
  CamelCase,
  SnakeCase,
  KebabCase,
  PascalCase,
  DelimiterCase,
  ScreamingSnakeCase as ConstantCase,
  Class,
  Asyncify,
  UnionToIntersection,
  Integer,
  NegativeInteger,
  NonNegativeInteger,
  Negative,
  NonNegative,
  Finite,
  PositiveInfinity,
  NegativeInfinity,
  Simplify,
  RequireAtLeastOne,
  RequireExactlyOne,
  RequireAllOrNone,
} from 'type-fest'

export type {
  AnyArray,
  ValueOf,
  ElementOf,
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
  ReadonlyKeys,
  WritableKeys,
  OptionalKeys,
  RequiredKeys,
} from 'ts-essentials'

// @index(['./**/*.ts', '!./**/*.test.*', '!**/__*'], f => `export * from '${f.path}'`)
export * from './AnyAsyncFunction.ts'
export * from './AnyFunction.ts'
export * from './AnyObject.ts'
export * from './Defined.ts'
export * from './DotPath.ts'
export * from './FirstParameter.ts'
export * from './IsAny.ts'
export * from './IsEmptyArray.ts'
export * from './IsEmptyObject.ts'
export * from './IsNever.ts'
export * from './NonEmptyArray.ts'
export * from './Nullable.ts'
export * from './OneOrMore.ts'
export * from './Path.ts'
// @endindex
