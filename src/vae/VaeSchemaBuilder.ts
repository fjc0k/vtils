import {
  DotPathWithRoot,
  DotPathWithRootValue,
  IsAny,
  Nullable,
  RequiredDeep,
} from '../types'
import { VaeArraySchema, VaeArraySchemaElementOf } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeDateSchema } from './VaeDateSchema'
import { VaeLocaleMessage } from './VaeLocale'
import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema, VaeObjectSchemaShapeOf } from './VaeObjectSchema'
import { VaeSchema } from './VaeSchema'
import { VaeStringSchema } from './VaeStringSchema'

export interface VaeStringSchemaBuilder {
  <T extends Nullable<string> = string>(
    schema: (schema: VaeStringSchema<T>) => VaeStringSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeStringSchema<T>

  <T extends Nullable<string> = string>(
    message?: VaeLocaleMessage,
  ): VaeStringSchema<T>
}

export interface VaeStringOfSchemaBuilder<O extends Record<any, any>> {
  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & string>(
    key: K,
    schema: (schema: VaeStringSchema<T>) => VaeStringSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeStringSchema<T>

  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & string>(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeStringSchema<T>
}

export interface VaeNumberSchemaBuilder {
  <T extends Nullable<number> = number>(
    schema: (schema: VaeNumberSchema<T>) => VaeNumberSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeNumberSchema<T>

  <T extends Nullable<number> = number>(
    message?: VaeLocaleMessage,
  ): VaeNumberSchema<T>
}

export interface VaeNumberOfSchemaBuilder<O extends Record<any, any>> {
  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & number>(
    key: K,
    schema: (schema: VaeNumberSchema<T>) => VaeNumberSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeNumberSchema<T>

  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & number>(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeNumberSchema<T>
}

export interface VaeDateSchemaBuilder {
  <T extends Nullable<Date> = Date>(
    schema: (schema: VaeDateSchema<T>) => VaeDateSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeDateSchema<T>

  <T extends Nullable<Date> = Date>(
    message?: VaeLocaleMessage,
  ): VaeDateSchema<T>
}

export interface VaeDateOfSchemaBuilder<O extends Record<any, any>> {
  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & Date>(
    key: K,
    schema: (schema: VaeDateSchema<T>) => VaeDateSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeDateSchema<T>

  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & Date>(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeDateSchema<T>
}

export interface VaeBooleanSchemaBuilder {
  <T extends Nullable<boolean> = boolean>(
    schema: (schema: VaeBooleanSchema<T>) => VaeBooleanSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeBooleanSchema<T>

  <T extends Nullable<boolean> = boolean>(
    message?: VaeLocaleMessage,
  ): VaeBooleanSchema<T>
}

export interface VaeBooleanOfSchemaBuilder<O extends Record<any, any>> {
  <
    K extends DotPathWithRoot<O>,
    T extends DotPathWithRootValue<O, K> & boolean,
  >(
    key: K,
    schema: (schema: VaeBooleanSchema<T>) => VaeBooleanSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeBooleanSchema<T>

  <
    K extends DotPathWithRoot<O>,
    T extends DotPathWithRootValue<O, K> & boolean,
  >(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeBooleanSchema<T>
}

export interface VaeObjectSchemaBuilder {
  <
    T0 extends Record<any, Nullable<any>> = Record<any, any>,
    T extends NonNullable<T0> = NonNullable<T0>,
  >(
    shape: VaeObjectSchemaShapeOf<T>,
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<IsAny<keyof T0> extends true ? T : T0>

  <T extends Nullable<Record<any, any>> = Record<any, any>>(
    schema: (schema: VaeObjectSchema<T>) => VaeObjectSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<T>

  <T extends Nullable<Record<any, any>> = Record<any, any>>(
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<T>
}

export interface VaeObjectOfSchemaBuilder<O extends Record<any, any>> {
  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & {}>(
    key: K,
    shape: VaeObjectSchemaShapeOf<T>,
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<T>

  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & {}>(
    key: K,
    schema: (schema: VaeObjectSchema<T>) => VaeObjectSchema<T>,
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<T>

  <K extends DotPathWithRoot<O>, T extends DotPathWithRootValue<O, K> & {}>(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeObjectSchema<T>
}

export interface VaeArraySchemaBuilder {
  <T extends Nullable<unknown[]> = unknown[]>(
    element: VaeArraySchemaElementOf<T>,
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>

  <T extends Nullable<unknown[]> = unknown[]>(
    schema: (schema: VaeArraySchema<T>) => VaeArraySchema<T>,
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>

  <T extends Nullable<unknown[]> = unknown[]>(
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>
}

export interface VaeArrayOfSchemaBuilder<O extends Record<any, any>> {
  <
    K extends DotPathWithRoot<O>,
    T extends DotPathWithRootValue<O, K> & unknown[],
  >(
    key: K,
    element: VaeArraySchemaElementOf<T>,
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>

  <
    K extends DotPathWithRoot<O>,
    T extends DotPathWithRootValue<O, K> & unknown[],
  >(
    key: K,
    schema: (schema: VaeArraySchema<T>) => VaeArraySchema<T>,
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>

  <
    K extends DotPathWithRoot<O>,
    T extends DotPathWithRootValue<O, K> & unknown[],
  >(
    key: K,
    message?: VaeLocaleMessage,
  ): VaeArraySchema<T>
}

export class VaeSchemaBuilder<
  X extends Nullable<Record<any, any>> = Nullable<Record<any, any>>,
  O extends RequiredDeep<X> = RequiredDeep<X>,
> {
  string: VaeStringSchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeStringSchema(message))
      : new VaeStringSchema(schema)

  stringOf: VaeStringOfSchemaBuilder<O> = (
    key: any,
    schema?: any,
    message?: any,
  ) => this.string(schema, message)

  number: VaeNumberSchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeNumberSchema(message))
      : new VaeNumberSchema(schema)

  numberOf: VaeNumberOfSchemaBuilder<O> = (
    key: any,
    schema?: any,
    message?: any,
  ) => this.number(schema, message)

  date: VaeDateSchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeDateSchema(message))
      : new VaeDateSchema(schema)

  dateOf: VaeDateOfSchemaBuilder<O> = (key: any, schema?: any, message?: any) =>
    this.date(schema, message)

  boolean: VaeBooleanSchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeBooleanSchema(message))
      : new VaeBooleanSchema(schema)

  booleanOf: VaeBooleanOfSchemaBuilder<O> = (
    key: any,
    schema?: any,
    message?: any,
  ) => this.boolean(schema, message)

  object: VaeObjectSchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeObjectSchema(undefined, message))
      : typeof schema === 'object'
      ? new VaeObjectSchema(schema, message)
      : new VaeObjectSchema(undefined, schema)

  objectOf: VaeObjectOfSchemaBuilder<O> = (
    key: any,
    schema?: any,
    message?: any,
  ) => this.object(schema, message)

  array: VaeArraySchemaBuilder = (schema?: any, message?: any) =>
    typeof schema === 'function'
      ? schema(new VaeArraySchema(undefined, message))
      : schema instanceof VaeSchema
      ? new VaeArraySchema(schema as any, message)
      : new VaeArraySchema(undefined, schema)

  arrayOf: VaeArrayOfSchemaBuilder<O> = (
    key: any,
    schema?: any,
    message?: any,
  ) => this.array(schema, message)
}
