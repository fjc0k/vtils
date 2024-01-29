import { DateLocale } from './Locale.ts'
import { MixedSchema } from './mixed.ts'
import { Refable } from './ref.ts'

export interface DateSchema<T extends Date = Date> extends MixedSchema<T> {
  min(limit: Refable<Date>, message?: DateLocale['min']): this

  max(limit: Refable<Date>, message?: DateLocale['max']): this
}

export declare function date<T extends Date = Date>(
  payload?: (schema: DateSchema<T>) => DateSchema<T>,
): DateSchema<T>
