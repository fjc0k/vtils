import { VaeArraySchema } from './VaeArraySchema'
import { VaeBooleanSchema } from './VaeBooleanSchema'
import { VaeDateSchema } from './VaeDateSchema'
import { VaeEnumSchema } from './VaeEnumSchema'
import { VaeLocaleMessage } from './VaeLocale'
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
}
