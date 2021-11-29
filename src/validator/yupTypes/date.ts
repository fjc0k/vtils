import { DateLocale } from './Locale'
import { MixedSchema } from './mixed'
import { Ref } from './ref'

export interface DateSchema<T extends Date = Date> extends MixedSchema<T> {
  min(limit: Date | Ref<Date>, message?: DateLocale['min']): this

  max(limit: Date | Ref<Date>, message?: DateLocale['max']): this
}

export declare function date<T extends Date = Date>(): DateSchema<T>
