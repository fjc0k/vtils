import { isBoolean } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeBooleanSchema<
  T0 extends boolean | undefined = boolean,
> extends VaeSchema<T0> {
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
