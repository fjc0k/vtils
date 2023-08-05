import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeNumberSchema extends VaeBaseSchema<number> {
  min(minNumber: number, message: VaeLocaleMessage = VaeLocale.number.min) {
    return this.check({
      fn: v => v >= minNumber,
      message: message,
      path: [],
    })
  }

  max(maxNumber: number, message: VaeLocaleMessage = VaeLocale.number.min) {
    return this.check({
      fn: v => v <= maxNumber,
      message: message,
      path: [],
    })
  }

  // https://zod.dev/?id=numbers
  gt() {}
  gte() {}
  lt() {}
  lte() {}
  int() {}
  positive() {}
  nonnegative() {}
  negative() {}
  nonpositive() {}
  multipleOf() {}
  finite() {}
  safe() {}
}
