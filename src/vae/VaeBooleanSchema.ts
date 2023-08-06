import { isBoolean } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeBooleanSchema<
  T extends boolean = boolean,
> extends VaeSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.boolean.type) {
    super({
      type: 'boolean',
    })
    this.transform(Boolean as any).check({
      fn: isBoolean,
      message: message,
    })
  }
}
