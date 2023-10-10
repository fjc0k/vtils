import { IsAny, Nullable } from '../types'
import { VaeArraySchema, VaeArraySchemaElementOf } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeDateSchema } from './VaeDateSchema'
import {
  VaeLocale,
  VaeLocaleBuilder,
  VaeLocaleMessage,
  VaeLocaleShape,
} from './VaeLocale'
import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema, VaeObjectSchemaShapeOf } from './VaeObjectSchema'
import { VaeSchema } from './VaeSchema'
import { VaeStringSchema } from './VaeStringSchema'

function string<T extends Nullable<string> = string>(
  schema: (schema: VaeStringSchema<T>) => VaeStringSchema<T>,
  message?: VaeLocaleMessage,
): VaeStringSchema<T>
function string<T extends Nullable<string> = string>(
  message?: VaeLocaleMessage,
): VaeStringSchema<T>
function string(messageOrSchema: any, message?: any) {
  return typeof messageOrSchema === 'function'
    ? messageOrSchema(new VaeStringSchema(message))
    : new VaeStringSchema(messageOrSchema)
}

function number<T extends Nullable<number> = number>(
  schema: (schema: VaeNumberSchema<T>) => VaeNumberSchema<T>,
  message?: VaeLocaleMessage,
): VaeNumberSchema<T>
function number<T extends Nullable<number> = number>(
  message?: VaeLocaleMessage,
): VaeNumberSchema<T>
function number(messageOrSchema: any, message?: any) {
  return typeof messageOrSchema === 'function'
    ? messageOrSchema(new VaeNumberSchema(message))
    : new VaeNumberSchema(messageOrSchema)
}

function date<T extends Nullable<Date> = Date>(
  schema: (schema: VaeDateSchema<T>) => VaeDateSchema<T>,
  message?: VaeLocaleMessage,
): VaeDateSchema<T>
function date<T extends Nullable<Date> = Date>(
  message?: VaeLocaleMessage,
): VaeDateSchema<T>
function date(messageOrSchema: any, message?: any) {
  return typeof messageOrSchema === 'function'
    ? messageOrSchema(new VaeDateSchema(message))
    : new VaeDateSchema(messageOrSchema)
}

function boolean<T extends Nullable<boolean> = boolean>(
  schema: (schema: VaeBooleanSchema<T>) => VaeBooleanSchema<T>,
  message?: VaeLocaleMessage,
): VaeBooleanSchema<T>
function boolean<T extends Nullable<boolean> = boolean>(
  message?: VaeLocaleMessage,
): VaeBooleanSchema<T>
function boolean(messageOrSchema: any, message?: any) {
  return typeof messageOrSchema === 'function'
    ? messageOrSchema(new VaeBooleanSchema(message))
    : new VaeBooleanSchema(messageOrSchema)
}

function object<
  T0 extends Record<any, Nullable<any>> = Record<any, any>,
  T extends NonNullable<T0> = NonNullable<T0>,
>(
  shape: VaeObjectSchemaShapeOf<T>,
  message?: VaeLocaleMessage,
): VaeObjectSchema<IsAny<keyof T0> extends true ? T : T0>
function object<T extends Nullable<Record<any, any>> = Record<any, any>>(
  schema: (schema: VaeObjectSchema<T>) => VaeObjectSchema<T>,
  message?: VaeLocaleMessage,
): VaeObjectSchema<T>
function object<T extends Nullable<Record<any, any>> = Record<any, any>>(
  message?: VaeLocaleMessage,
): VaeObjectSchema<T>
function object(messageOrSchemaOrShape: any, message?: any) {
  return typeof messageOrSchemaOrShape === 'function'
    ? messageOrSchemaOrShape(new VaeObjectSchema(undefined, message))
    : typeof messageOrSchemaOrShape === 'object'
    ? new VaeObjectSchema(messageOrSchemaOrShape, message)
    : new VaeObjectSchema(undefined, messageOrSchemaOrShape)
}

function array<T extends Nullable<unknown[]> = unknown[]>(
  element: VaeArraySchemaElementOf<T>,
  message?: VaeLocaleMessage,
): VaeArraySchema<T>
function array<T extends Nullable<unknown[]> = unknown[]>(
  schema: (schema: VaeArraySchema<T>) => VaeArraySchema<T>,
  message?: VaeLocaleMessage,
): VaeArraySchema<T>
function array<T extends Nullable<unknown[]> = unknown[]>(
  message?: VaeLocaleMessage,
): VaeArraySchema<T>
function array(messageOrSchemaOrElement: any, message?: any) {
  return typeof messageOrSchemaOrElement === 'function'
    ? messageOrSchemaOrElement(new VaeArraySchema(undefined, message))
    : messageOrSchemaOrElement instanceof VaeSchema
    ? new VaeArraySchema(messageOrSchemaOrElement as any, message)
    : new VaeArraySchema(undefined, messageOrSchemaOrElement)
}

const schemaBuilders = {
  string,

  number,

  date,

  boolean,

  object,

  array,
}

export const v = {
  ...schemaBuilders,

  create: <
    R,
    F extends (_: typeof schemaBuilders) => R = (_: typeof schemaBuilders) => R,
  >(
    cb: F,
  ): R => cb(schemaBuilders),

  localeBuilder: VaeLocaleBuilder,
  setLocale: (locale: VaeLocaleShape) => {
    VaeLocale.$set(locale)
  },
}

// @index('./Vae*.ts', f => `export * from '${f.path}'`)
export * from './VaeArraySchema'
export * from './VaeBooleanSchema'
export * from './VaeDateSchema'
export * from './VaeError'
export * from './VaeIssue'
export * from './VaeLocale'
export * from './VaeNumberSchema'
export * from './VaeObjectSchema'
export * from './VaeSchema'
export * from './VaeSchemaParseContext'
export * from './VaeSchemaReachContext'
export * from './VaeStringSchema'
// @endindex
