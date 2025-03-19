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
  UnionToTuple,
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
  SetRequiredDeep as RequiredDeepBy,
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
  XOR
} from 'ts-essentials'

// @index(['./**/*.ts', '!./**/*.test.*', '!**/__*'], f => `export * from '${f.path}'`)
export * from './AnyAsyncFunction'
export * from './AnyFunction'
export * from './AnyObject'
export * from './Defined'
export * from './DotPath'
export * from './FirstParameter'
export * from './IsAny'
export * from './IsEmptyArray'
export * from './IsEmptyObject'
export * from './IsNever'
export * from './NonEmptyArray'
export * from './Nullable'
export * from './OneOrMore'
export * from './PartialDeepBy'
export * from './Path'
// @endindex
