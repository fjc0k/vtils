import { VaeArraySchema } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeDateSchema } from './VaeDateSchema'
import { VaeEnumSchema } from './VaeEnumSchema'
import {
  VaeLocale,
  VaeLocaleBuilder,
  VaeLocaleMessage,
  VaeLocaleShape,
} from './VaeLocale'
import { VaeNumberSchema } from './VaeNumberSchema'
import { VaeObjectSchema } from './VaeObjectSchema'
import { VaeStringSchema } from './VaeStringSchema'

export const v = {
  string: <T extends string = string>(message?: VaeLocaleMessage) =>
    new VaeStringSchema<T>(message),
  number: <T extends number = number>(message?: VaeLocaleMessage) =>
    new VaeNumberSchema<T>(message),
  object: <T extends Record<any, any> = Record<any, any>>(
    schema?: any,
    message?: VaeLocaleMessage,
  ) => new VaeObjectSchema<T>(schema, message),
  array: <T extends any[] = any[]>(schema?: any, message?: VaeLocaleMessage) =>
    new VaeArraySchema<T>(schema, message),
  enum: <T extends any = any>(value: any, message?: VaeLocaleMessage) =>
    new VaeEnumSchema<T>(value, message),
  date: <T extends Date = Date>(message?: VaeLocaleMessage) =>
    new VaeDateSchema<T>(message),
  boolean: <T extends boolean = boolean>(message?: VaeLocaleMessage) =>
    new VaeBooleanSchema<T>(message),

  localeBuilder: VaeLocaleBuilder,
  setLocale: (locale: VaeLocaleShape) => {
    VaeLocale.$set(locale)
  },
}

// @index('./Vae*.ts', f => `export * from '${f.path}'`)
export * from './VaeArraySchema'
export * from './VaeBooleanSchema'
export * from './VaeContext'
export * from './VaeDateSchema'
export * from './VaeEnumSchema'
export * from './VaeError'
export * from './VaeIssue'
export * from './VaeLocale'
export * from './VaeNumberSchema'
export * from './VaeObjectSchema'
export * from './VaeSchema'
export * from './VaeStringSchema'
// @endindex
