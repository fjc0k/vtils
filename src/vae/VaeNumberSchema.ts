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
}
