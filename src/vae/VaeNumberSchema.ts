import { isInteger, isNaN, isNumber } from 'lodash-uni'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeNumberSchema<
  T extends number = number,
> extends VaeBaseSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.number.type) {
    super()
    this.check({
      fn: v => isNumber(v) && !isNaN(v),
      message: message,
    })
  }

  min(minNumber: number, message: VaeLocaleMessage = VaeLocale.number.min) {
    return this.check({
      fn: v => v >= minNumber,
      message: message,
    })
  }

  max(maxNumber: number, message: VaeLocaleMessage = VaeLocale.number.max) {
    return this.check({
      fn: v => v <= maxNumber,
      message: message,
    })
  }

  gt(value: number, message: VaeLocaleMessage = VaeLocale.number.gt) {
    return this.check({
      fn: v => v > value,
      message: message,
    })
  }

  gte(value: number, message: VaeLocaleMessage = VaeLocale.number.gte) {
    return this.check({
      fn: v => v >= value,
      message: message,
    })
  }

  lt(value: number, message: VaeLocaleMessage = VaeLocale.number.lt) {
    return this.check({
      fn: v => v < value,
      message: message,
    })
  }

  lte(value: number, message: VaeLocaleMessage = VaeLocale.number.lte) {
    return this.check({
      fn: v => v <= value,
      message: message,
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
