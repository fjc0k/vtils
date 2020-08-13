declare module 'yup/es' {
  export interface ObjectSchema<T extends {} = {}> extends MixedSchema<T> {
    shape(
      fields: GetObjectSchema<T>,
      noSortEdges?: Array<[string, string]>,
    ): this

    from(fromKey: keyof T, toKey: string, alias?: boolean): this

    noUnknown(
      onlyKnownKeys?: boolean,
      message?: ObjectLocale['noUnknown'],
    ): this

    camelCase(): this

    constantCase(): this

    validateInOrder(value: T, options?: SchemaValidateOptions): Promise<T>

    validateInOrderSync(value: T, options?: SchemaValidateOptions): T
  }

  export function object<T extends {} = {}>(
    fields?: GetObjectSchema<T>,
  ): ObjectSchema<T>
}
