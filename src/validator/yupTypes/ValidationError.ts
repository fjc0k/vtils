declare module 'yup/es' {
  export class ValidationError {
    value: any

    path: string

    type: string

    errors: any[]

    inner: any[]

    message: string

    stack?: any

    static isError<T>(err: T): boolean

    static formatError(
      message: LocaleValue,
      params: LocaleValueFnParams,
    ): string
  }
}
