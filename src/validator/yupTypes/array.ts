import { ArrayLocale, MixedLocale } from './Locale'
import { GetSchema, MixedSchema } from './mixed'
import { Ref } from './ref'

export interface ArraySchema<T extends any = any> extends MixedSchema<T[]> {
  of(type: GetSchema<T>): this

  required(message?: MixedLocale['required']): this

  min(limit: number | Ref<number>, message?: ArrayLocale['min']): this

  max(limit: number | Ref<number>, message?: ArrayLocale['max']): this

  ensure(): this

  compact(rejector: (value: T) => boolean): this
}

export declare function array<T extends any = any>(): ArraySchema<T>
