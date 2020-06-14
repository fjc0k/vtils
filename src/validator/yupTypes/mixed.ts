declare module 'yup/es' {
  export interface SchemaDescription {
    type: string
    label: string
    meta: {}
    tests: Array<{
      name: string
      params: {}
    }>
  }

  export interface SchemaValidateOptions {
    strict?: boolean
    abortEarly?: boolean
    stripUnknown?: boolean
    recursive?: boolean
    context?: {}
  }

  export interface SchemaTestOptions<TSchema, TValue, TParams = {}> {
    name: string
    message: LocaleValue<TParams>
    test: (
      this: {
        path: string
        schema: TSchema
        options: SchemaValidateOptions
        parent: any
        createError: (options: {
          path: string
          message: LocaleValue
          params?: TParams
        }) => ValidationError
      },
      value: TValue,
    ) => boolean | Promise<boolean>
    params?: TParams
    exclusive?: boolean
  }

  export interface MixedSchema<T = any> {
    __isYupSchema__: true

    type:
      | 'mixed'
      | 'string'
      | 'number'
      | 'boolean'
      | 'object'
      | 'date'
      | 'array'

    clone(): this

    label(label: string): this

    meta(meta: {}): this

    describe(): SchemaDescription

    /** @类型不友好 */
    concat(schema: MixedSchema<any>): this

    validate(value: T, options?: SchemaValidateOptions): Promise<T>

    validateSync(value: T, options?: SchemaValidateOptions): T

    /** @类型不友好 */
    validateAt(
      path: string,
      value: any,
      options?: SchemaValidateOptions,
    ): Promise<any>

    /** @类型不友好 */
    validateSyncAt(
      path: string,
      value: any,
      options?: SchemaValidateOptions,
    ): any

    isValid(value: T, options?: SchemaValidateOptions): Promise<boolean>

    isValidSync(value: T, options?: SchemaValidateOptions): boolean

    cast(value: T, options?: SchemaValidateOptions): any

    isType(value: T): boolean

    strict(isStrict?: boolean): this

    strip(stripField?: boolean): this

    withMutation<X>(fn: (schema: this) => X): X

    default(value: T | (() => T)): this

    default(): T | undefined

    nullable(isNullable?: boolean): this

    required(message?: MixedLocale['required']): this

    notRequired(): this

    defined(): this

    typeError(message: LocaleValue): this

    oneOf(arrayOfValues: T[], message?: MixedLocale['oneOf']): this

    equals(arrayOfValues: T[], message?: MixedLocale['oneOf']): this

    notOneOf(arrayOfValues: T[], message?: MixedLocale['notOneOf']): this

    /** @仅保留了类型友好的用法 */
    when(builder: (value: T, schema: this) => this): this

    test(
      name: SchemaTestOptions<this, T>['name'],
      message: SchemaTestOptions<this, T>['message'],
      test: SchemaTestOptions<this, T>['test'],
    ): this

    test<TParams = {}>(options: SchemaTestOptions<this, T, TParams>): this

    transform(
      transformer: (this: this, currentValue: T, originalValue: T) => T,
    ): this
  }

  export type GetSchema<T> = T extends string
    ? StringSchema<T>
    : T extends number
    ? NumberSchema<T>
    : T extends boolean
    ? BooleanSchema<T>
    : T extends Array<infer X>
    ? ArraySchema<X>
    : T extends {}
    ? ObjectSchema<T>
    : MixedSchema<T>

  export type GetObjectSchema<T extends {}> = {
    [K in keyof T]: GetSchema<T[K]>
  }

  export function mixed<T>(): MixedSchema<T>
}
