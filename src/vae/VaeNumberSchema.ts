import { isInteger, isNumeric, toNumber } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeNumberSchema<
  T0 extends number | undefined = number,
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

  integer(message: VaeLocaleMessage = VaeLocale.number.integer) {
    return this.check({
      fn: isInteger,
      message: message,
      tag: 'integer',
    })
  }

  positive(message: VaeLocaleMessage = VaeLocale.number.positive) {
    return this.check({
      fn: v => v > 0,
      message: message,
      tag: 'positive',
    })
  }

  nonpositive(message: VaeLocaleMessage = VaeLocale.number.nonpositive) {
    return this.check({
      fn: v => v <= 0,
      message: message,
      tag: 'nonpositive',
    })
  }

  negative(message: VaeLocaleMessage = VaeLocale.number.negative) {
    return this.check({
      fn: v => v < 0,
      message: message,
      tag: 'negative',
    })
  }

  nonnegative(message: VaeLocaleMessage = VaeLocale.number.nonnegative) {
    return this.check({
      fn: v => v >= 0,
      message: message,
      tag: 'nonnegative',
    })
  }

  positiveInteger(
    message: VaeLocaleMessage = VaeLocale.number.positiveInteger,
  ) {
    return this.check({
      fn: v => v > 0 && isInteger(v),
      message: message,
      tag: 'positiveInteger',
    })
  }

  id(message: VaeLocaleMessage = VaeLocale.number.positiveInteger) {
    return this.positiveInteger(message)
  }
}
