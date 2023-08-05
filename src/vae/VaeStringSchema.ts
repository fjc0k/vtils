import { endsWith, includes, isString, startsWith } from 'lodash-uni'
import {
  isChineseIDCardNumber,
  isEmail,
  isPossibleChineseMobilePhoneNumber,
  isUrl,
} from '../utils'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeStringSchema<
  T extends string = string,
> extends VaeBaseSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.string.type) {
    super()
    this.check({
      fn: isString,
      message: message,
    })
  }

  min(minLength: number, message: VaeLocaleMessage = VaeLocale.string.min) {
    return this.check({
      fn: v => v.length >= minLength,
      message: message,
    })
  }

  max(maxLength: number, message: VaeLocaleMessage = VaeLocale.string.max) {
    return this.check({
      fn: v => v.length <= maxLength,
      message: message,
    })
  }

  length(len: number, message: VaeLocaleMessage = VaeLocale.string.length) {
    return this.check({
      fn: v => v.length === len,
      message: message,
    })
  }

  email(message: VaeLocaleMessage = VaeLocale.string.email) {
    return this.check({
      fn: isEmail,
      message: message,
    })
  }

  url(message: VaeLocaleMessage = VaeLocale.string.url) {
    return this.check({
      fn: isUrl,
      message: message,
    })
  }

  regex(regex: RegExp, message: VaeLocaleMessage = VaeLocale.string.regex) {
    return this.check({
      fn: v => {
        regex.lastIndex = 0
        return regex.test(v)
      },
      message: message,
    })
  }

  includes(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.includes,
  ) {
    return this.check({
      fn: v => includes(v, value),
      message: message,
    })
  }

  startsWith(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.startsWith,
  ) {
    return this.check({
      fn: v => startsWith(v, value),
      message: message,
    })
  }

  endsWith(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.endsWith,
  ) {
    return this.check({
      fn: v => endsWith(v, value),
      message: message,
    })
  }

  chinesePhoneNumber(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.chinesePhoneNumber,
  ) {
    return this.check({
      fn: isPossibleChineseMobilePhoneNumber,
      message: message,
    })
  }

  chineseIDCardNumber(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.chineseIDCardNumber,
  ) {
    return this.check({
      fn: isChineseIDCardNumber,
      message: message,
    })
  }
}
