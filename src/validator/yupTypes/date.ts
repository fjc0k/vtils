declare module 'yup/es' {
  export interface DateSchema<T extends Date = Date> extends MixedSchema<T> {
    min(limit: Date | Ref, message?: DateLocale['min']): this

    max(limit: Date | Ref, message?: DateLocale['max']): this
  }

  export function date<T extends Date = Date>(): DateSchema<T>
}
