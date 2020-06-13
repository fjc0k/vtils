declare module 'yup/es' {
  export interface ArraySchema<T extends any = any> extends MixedSchema<T[]> {
    of(type: GetSchema<T>): this

    required(message?: MixedLocale['required']): this

    min(limit: number | Ref, message?: ArrayLocale['min']): this

    max(limit: number | Ref, message?: ArrayLocale['max']): this

    ensure(): this

    compact(rejector: (value: T) => boolean): this
  }

  export function array<T extends any = any>(): ArraySchema<T>
}
