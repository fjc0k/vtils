import { DateLocale } from './Locale'
import { MixedSchema } from './mixed'
import { Refable } from './ref'

export interface DateSchema<T extends Date = Date> extends MixedSchema<T> {
  min(limit: Refable<Date>, message?: DateLocale['min']): this

  max(limit: Refable<Date>, message?: DateLocale['max']): this
}

export declare function date<T extends Date = Date>(
  payload?: (schema: DateSchema<T>) => DateSchema<T>,
): DateSchema<T>
