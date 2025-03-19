// https://github.com/sindresorhus/type-fest/blob/main/source/set-required-deep.d.ts

import {
  IsAny,
  Paths,
  RequiredDeep,
  SetOptional,
  SimplifyDeep,
  UnionToTuple,
  UnknownArray,
} from 'type-fest'
import { NonRecursiveType, StringToNumber } from 'type-fest/source/internal'

export type PartialDeepBy<
  BaseType,
  KeyPaths extends Paths<BaseType>,
> = IsAny<KeyPaths> extends true
  ? SimplifyDeep<RequiredDeep<BaseType>>
  : PartialDeepByHelper<BaseType, UnionToTuple<KeyPaths>>

type PartialDeepByHelper<
  BaseType,
  KeyPathsTuple extends UnknownArray,
> = KeyPathsTuple extends [infer KeyPath, ...infer RestPaths]
  ? PartialDeepByHelper<PartialDeepBySinglePath<BaseType, KeyPath>, RestPaths>
  : BaseType

type PartialDeepBySinglePath<BaseType, KeyPath> =
  BaseType extends NonRecursiveType
    ? BaseType
    : KeyPath extends `${infer Property}.${infer RestPath}`
    ? {
        [Key in keyof BaseType]: Property extends `${Key & (string | number)}`
          ? PartialDeepBySinglePath<BaseType[Key], RestPath>
          : BaseType[Key]
      }
    : SetOptional<
        BaseType,
        (KeyPath | StringToNumber<KeyPath & string>) & keyof BaseType
      >
