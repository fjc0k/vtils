import { ArrayLocale, MixedLocale } from './Locale'
import { GetSchema, MixedSchema } from './mixed'
import { Refable } from './ref'

export interface ArraySchema<T extends any = any> extends MixedSchema<T[]> {
  of(type: GetSchema<T>): this

  required(message?: MixedLocale['required']): this

  min(limit: Refable<number>, message?: ArrayLocale['min']): this

  max(limit: Refable<number>, message?: ArrayLocale['max']): this

  ensure(): this

  compact(rejector: (value: T) => boolean): this
}

export declare function array<T extends any = any>(
  payload?: (schema: ArraySchema<T>) => ArraySchema<T>,
): ArraySchema<T>
