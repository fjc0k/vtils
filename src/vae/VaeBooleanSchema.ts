import { isBoolean } from 'lodash-uni'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeBooleanSchema<
  T extends boolean = boolean,
> extends VaeBaseSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.boolean.type) {
    super()
    this.transform(Boolean as any).check({
      fn: isBoolean,
      message: message,
    })
  }
}
