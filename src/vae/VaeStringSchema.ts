import {
  endsWith,
  includes,
  isChineseIDCardNumber,
  isEmail,
  isPossibleChineseMobilePhoneNumber,
  isString,
  isUrl,
  startsWith,
} from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeStringSchema<T extends string = string> extends VaeSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.string.type) {
    super({
      type: 'string',
    })
    this.transform(v => (typeof v === 'number' ? (String(v) as any) : v)).check(
      {
        fn: isString,
        message: message,
      },
    )
  }

  min(value: number, message: VaeLocaleMessage = VaeLocale.string.min) {
    return this.check({
      fn: v => v.length >= value,
      message: message,
      messageParams: {
        min: value,
      },
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.string.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
      messageParams: {
        max: value,
      },
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.string.length) {
    return this.check({
      fn: v => v.length === value,
      message: message,
      messageParams: {
        length: value,
      },
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
      messageParams: {
        regex: value,
      },
    })
  }

  includes(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.includes,
  ) {
    return this.check({
      fn: v => includes(v, value),
      message: message,
      messageParams: {
        includes: value,
      },
    })
  }

  startsWith(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.startsWith,
  ) {
    return this.check({
      fn: v => startsWith(v, value),
      message: message,
      messageParams: {
        startsWith: value,
      },
    })
  }

  endsWith(
    value: string,
    message: VaeLocaleMessage = VaeLocale.string.endsWith,
  ) {
    return this.check({
      fn: v => endsWith(v, value),
      message: message,
      messageParams: {
        endsWith: value,
      },
    })
  }

  phoneNumber(message: VaeLocaleMessage = VaeLocale.string.phoneNumber) {
    return this.check({
      fn: isPossibleChineseMobilePhoneNumber,
      message: message,
    })
  }

  idCardNumber(message: VaeLocaleMessage = VaeLocale.string.idCardNumber) {
    return this.check({
      fn: isChineseIDCardNumber,
      message: message,
    })
  }

  trim() {
    this._stringTrim = true
    return this
  }

  emptyable() {
    this._stringEmptyable = true
    return this
  }
}
