import { Nullable } from '../types'
import { isInteger, isNumeric, toNumber } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeNumberSchema<
  T0 extends Nullable<number> = number,
> extends VaeSchema<T0> {
  constructor(message: VaeLocaleMessage = VaeLocale.number.type) {
    super({
      type: 'number',
    })
    this.check({
      fn: isNumeric,
      message: message,
    }).transform(toNumber as any)
  }

  /**
   * 最小值
   */
  min(value: number, message: VaeLocaleMessage = VaeLocale.number.min) {
    return this.check({
      fn: v => v >= value,
      message: message,
      messageParams: {
        min: value,
      },
      tag: 'min',
    })
  }

  /**
   * 最大值
   */
  max(value: number, message: VaeLocaleMessage = VaeLocale.number.max) {
    return this.check({
      fn: v => v <= value,
      message: message,
      messageParams: {
        max: value,
      },
      tag: 'max',
    })
  }

  /**
   * 小于
   */
  lessThan(
    value: number,
    message: VaeLocaleMessage = VaeLocale.number.lessThan,
  ) {
    return this.check({
      fn: v => v < value,
      message: message,
      messageParams: {
        lessThan: value,
      },
      tag: 'lessThan',
    })
  }

  /**
   * 大于
   */
  moreThan(
    value: number,
    message: VaeLocaleMessage = VaeLocale.number.moreThan,
  ) {
    return this.check({
      fn: v => v > value,
      message: message,
      messageParams: {
        moreThan: value,
      },
      tag: 'moreThan',
    })
  }

  /**
   * 整数，即 -100, -1, 0, 1, 2, 100, ...
   */
  integer(message: VaeLocaleMessage = VaeLocale.number.integer) {
    return this.check({
      fn: isInteger,
      message: message,
      tag: 'integer',
    })
  }

  /**
   * 正数，即 0.01, 0.1, 1, 2, 3, ...
   */
  positive(message: VaeLocaleMessage = VaeLocale.number.positive) {
    return this.check({
      fn: v => v > 0,
      message: message,
      tag: 'positive',
    })
  }

  /**
   * 非正数，即 0, -0.01, -1, -100, ...
   */
  nonpositive(message: VaeLocaleMessage = VaeLocale.number.nonpositive) {
    return this.check({
      fn: v => v <= 0,
      message: message,
      tag: 'nonpositive',
    })
  }

  /**
   * 负数，即 -0.01, -1, -100, ...
   */
  negative(message: VaeLocaleMessage = VaeLocale.number.negative) {
    return this.check({
      fn: v => v < 0,
      message: message,
      tag: 'negative',
    })
  }

  /**
   * 非负数，即 0, 0.01, 0.1, 1, 2.1, 100, ...
   */
  nonnegative(message: VaeLocaleMessage = VaeLocale.number.nonnegative) {
    return this.check({
      fn: v => v >= 0,
      message: message,
      tag: 'nonnegative',
    })
  }

  /**
   * 正整数，即 1, 2, 3, 4, 5, ...
   */
  positiveInteger(
    message: VaeLocaleMessage = VaeLocale.number.positiveInteger,
  ) {
    return this.check({
      fn: v => v > 0 && isInteger(v),
      message: message,
      tag: 'positiveInteger',
    })
  }

  /**
   * ID，即正整数，即 1, 2, 3, 4, 5, ...
   */
  id(message: VaeLocaleMessage = VaeLocale.number.positiveInteger) {
    return this.positiveInteger(message)
  }
}
