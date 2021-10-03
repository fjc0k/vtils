import { array, ArraySchema } from './array'
import { boolean, BooleanSchema } from './boolean'
import { date, DateSchema } from './date'
import { mixed, MixedSchema } from './mixed'
import { number, NumberSchema } from './number'
import { object, ObjectSchema } from './object'
import { string, StringSchema } from './string'

export declare function addMethod<
  TSchemaType extends
    | typeof mixed
    | typeof string
    | typeof number
    | typeof boolean
    | typeof date
    | typeof array
    | typeof object,
  TSchema extends TSchemaType extends typeof mixed
    ? MixedSchema
    : TSchemaType extends typeof string
    ? StringSchema
    : TSchemaType extends typeof number
    ? NumberSchema
    : TSchemaType extends typeof boolean
    ? BooleanSchema
    : TSchemaType extends typeof date
    ? DateSchema
    : TSchemaType extends typeof array
    ? ArraySchema
    : TSchemaType extends typeof object
    ? ObjectSchema
    : MixedSchema,
>(
  schemaType: TSchemaType,
  name: string,
  fn: (this: TSchema, ...args: any[]) => TSchema,
): void
