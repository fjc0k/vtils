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
      tag: 'min',
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.string.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
      messageParams: {
        max: value,
      },
      tag: 'max',
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.string.length) {
    return this.check({
      fn: v => v.length === value,
      message: message,
      messageParams: {
        length: value,
      },
      tag: 'length',
    })
  }

  email(message: VaeLocaleMessage = VaeLocale.string.email) {
    return this.check({
      fn: isEmail,
      message: message,
      tag: 'email',
    })
  }

  url(message: VaeLocaleMessage = VaeLocale.string.url) {
    return this.check({
      fn: isUrl,
      message: message,
      tag: 'url',
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
      tag: 'regex',
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
      tag: 'includes',
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
      tag: 'startsWith',
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
      tag: 'endsWith',
    })
  }

  phoneNumber(message: VaeLocaleMessage = VaeLocale.string.phoneNumber) {
    return this.check({
      fn: isPossibleChineseMobilePhoneNumber,
      message: message,
      tag: 'phoneNumber',
    })
  }

  idCardNumber(message: VaeLocaleMessage = VaeLocale.string.idCardNumber) {
    return this.check({
      fn: isChineseIDCardNumber,
      message: message,
      tag: 'idCardNumber',
    })
  }

  trim() {
    this._options.stringTrim = true
    return this
  }

  emptyable() {
    this._options.stringEmptyable = true
    return this
  }
}
