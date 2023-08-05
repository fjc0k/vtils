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

  required(message: VaeLocaleMessage = VaeLocale.base.required) {
    return this.check({
      fn: v => v != null && v !== '',
      message: message,
      tag: 'required',
    })
  }

  min(value: number, message: VaeLocaleMessage = VaeLocale.string.min) {
    return this.check({
      fn: v => v.length >= value,
      message: message,
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.string.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.string.length) {
    return this.check({
      fn: v => v.length === value,
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

  regex(value: RegExp, message: VaeLocaleMessage = VaeLocale.string.regex) {
    return this.check({
      fn: v => {
        value.lastIndex = 0
        return value.test(v)
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
    message: VaeLocaleMessage = VaeLocale.string.chinesePhoneNumber,
  ) {
    return this.check({
      fn: isPossibleChineseMobilePhoneNumber,
      message: message,
    })
  }

  chineseIDCardNumber(
    message: VaeLocaleMessage = VaeLocale.string.chineseIDCardNumber,
  ) {
    return this.check({
      fn: isChineseIDCardNumber,
      message: message,
    })
  }
}
