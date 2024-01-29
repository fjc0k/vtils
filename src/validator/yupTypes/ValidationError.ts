import { LocaleValue, LocaleValueFnParams } from './Locale.ts'

export declare class ValidationError {
  value: any

  path: string

  type: string

  errors: string[]

  inner: any[]

  message: string

  stack?: any

  static isError<T>(err: T): boolean

  static formatError(message: LocaleValue, params: LocaleValueFnParams): string
}
