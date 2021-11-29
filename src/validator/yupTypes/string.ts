import { MixedLocale, StringLocale } from './Locale'
import { MixedSchema } from './mixed'
import { Ref } from './ref'

export interface StringSchema<T extends string = string>
  extends MixedSchema<T> {
  required(message?: MixedLocale['required']): this

  length(limit: number | Ref<number>, message?: StringLocale['length']): this

  min(limit: number | Ref<number>, message?: StringLocale['min']): this

  max(limit: number | Ref<number>, message?: StringLocale['max']): this

  matches(regex: RegExp, message?: StringLocale['matches']): this

  matches(
    regex: RegExp,
    options?: {
      excludeEmptyString?: boolean
      message?: StringLocale['matches']
    },
  ): this

  email(message?: StringLocale['email']): this

  url(message?: StringLocale['url']): this

  ensure(): this

  trim(message?: StringLocale['trim']): this

  lowercase(message?: StringLocale['lowercase']): this

  uppercase(message?: StringLocale['uppercase']): this

  chineseMobilePhoneNumber(
    message?: StringLocale['chineseMobilePhoneNumber'],
  ): this

  chineseIDCardNumber(message?: StringLocale['chineseIDCardNumber']): this
}

export declare function string<T extends string = string>(): StringSchema<T>
