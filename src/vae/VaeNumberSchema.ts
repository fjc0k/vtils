import { isInteger, isNumeric, toNumber } from '../utils'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeNumberSchema<
  T extends number = number,
> extends VaeBaseSchema<T> {
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
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.number.max) {
    return this.check({
      fn: v => v <= value,
      message: message,
      messageParams: {
        max: value,
      },
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
    })
  }

  integer(message: VaeLocaleMessage = VaeLocale.number.integer) {
    return this.check({
      fn: isInteger,
      message: message,
    })
  }

  positive(message: VaeLocaleMessage = VaeLocale.number.positive) {
    return this.check({
      fn: v => v > 0,
      message: message,
    })
  }

  nonpositive(message: VaeLocaleMessage = VaeLocale.number.nonpositive) {
    return this.check({
      fn: v => v <= 0,
      message: message,
    })
  }

  negative(message: VaeLocaleMessage = VaeLocale.number.negative) {
    return this.check({
      fn: v => v < 0,
      message: message,
    })
  }

  nonnegative(message: VaeLocaleMessage = VaeLocale.number.nonnegative) {
    return this.check({
      fn: v => v >= 0,
      message: message,
    })
  }

  positiveInteger(
    message: VaeLocaleMessage = VaeLocale.number.positiveInteger,
  ) {
    return this.check({
      fn: v => v > 0 && isInteger(v),
      message: message,
    })
  }

  id(message: VaeLocaleMessage = VaeLocale.number.positiveInteger) {
    return this.positiveInteger(message)
  }
}
