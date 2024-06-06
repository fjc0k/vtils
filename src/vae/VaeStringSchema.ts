import { Nullable } from '../types'
import {
  endsWith,
  includes,
  isChineseIDCardNumber,
  isCuid,
  isCuid2,
  isEmail,
  isPossibleChineseMobilePhoneNumber,
  isString,
  isUrl,
  startsWith,
} from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeStringSchema<
  T0 extends Nullable<string> = string,
> extends VaeSchema<T0> {
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

  /**
   * 最小长度
   */
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

  /**
   * 最大长度
   */
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

  /**
   * 固定长度
   */
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

  /**
   * 邮箱地址
   */
  email(message: VaeLocaleMessage = VaeLocale.string.email) {
    return this.check({
      fn: isEmail,
      message: message,
      tag: 'email',
    })
  }

  /**
   * 链接
   */
  url(message: VaeLocaleMessage = VaeLocale.string.url) {
    return this.check({
      fn: isUrl,
      message: message,
      tag: 'url',
    })
  }

  /**
   * 正则
   */
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

  /**
   * 包含
   */
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

  /**
   * 前缀
   */
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

  /**
   * 后缀
   */
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

  /**
   * 手机号码
   */
  phoneNumber(message: VaeLocaleMessage = VaeLocale.string.phoneNumber) {
    return this.check({
      fn: isPossibleChineseMobilePhoneNumber,
      message: message,
      tag: 'phoneNumber',
    })
  }

  /**
   * 身份证号码
   */
  idCardNumber(message: VaeLocaleMessage = VaeLocale.string.idCardNumber) {
    return this.check({
      fn: isChineseIDCardNumber,
      message: message,
      tag: 'idCardNumber',
    })
  }

  /**
   * cuid
   */
  cuid(message: VaeLocaleMessage = VaeLocale.string.cuid) {
    return this.check({
      fn: isCuid,
      message: message,
      tag: 'cuid',
    })
  }

  /**
   * cuid2
   */
  cuid2(message: VaeLocaleMessage = VaeLocale.string.cuid2) {
    return this.check({
      fn: isCuid2,
      message: message,
      tag: 'cuid2',
    })
  }

  /**
   * 去除两侧空字符串
   */
  trim() {
    this._options.stringTrim = true
    return this
  }

  /**
   * 当设置了必填时，将空字符串视为已填
   */
  emptyable() {
    this._options.stringEmptyable = true
    return this
  }
}
