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
  string: (message?: VaeLocaleMessage) => new VaeStringSchema(message),
  number: (message?: VaeLocaleMessage) => new VaeNumberSchema(message),
  object: (schema?: any, message?: VaeLocaleMessage) =>
    new VaeObjectSchema(schema, message),
  array: (schema?: any, message?: VaeLocaleMessage) =>
    new VaeArraySchema(schema, message),
  enum: (value: any, message?: VaeLocaleMessage) =>
    new VaeEnumSchema(value, message),
  date: (message?: VaeLocaleMessage) => new VaeDateSchema(message),
  boolean: (message?: VaeLocaleMessage) => new VaeBooleanSchema(message),

  localeBuilder: VaeLocaleBuilder,
  setLocale: (locale: VaeLocaleShape) => {
    VaeLocale.$set(locale)
  },
}

// @index('./Vae*.ts', f => `export * from '${f.path}'`)
export * from './VaeArraySchema'
export * from './VaeBaseSchema'
export * from './VaeBooleanSchema'
export * from './VaeContext'
export * from './VaeDateSchema'
export * from './VaeEnumSchema'
export * from './VaeError'
export * from './VaeIssue'
export * from './VaeLocale'
export * from './VaeNumberSchema'
export * from './VaeObjectSchema'
export * from './VaeStringSchema'
// @endindex
