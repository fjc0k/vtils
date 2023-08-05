import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeStringSchema extends VaeBaseSchema<string> {
  min(minLength: number, message: VaeLocaleMessage = VaeLocale.string.min) {
    return this.check(v => v.length >= minLength, message)
  }
}
