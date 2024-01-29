import { ArrayLocale, MixedLocale } from './Locale.ts'
import { GetSchema, MixedSchema } from './mixed.ts'
import { Refable } from './ref.ts'

export interface ArraySchema<T extends any = any> extends MixedSchema<T[]> {
  of(type: GetSchema<T>): this

  required(message?: MixedLocale['required']): this

  min(limit: Refable<number>, message?: ArrayLocale['min']): this

  max(limit: Refable<number>, message?: ArrayLocale['max']): this

  ensure(): this

  compact(rejector: (value: T) => boolean): this
}

export declare function array<T extends any = any>(
  type?: GetSchema<T> | ((schema: ArraySchema<T>) => ArraySchema<T>),
): ArraySchema<T>
