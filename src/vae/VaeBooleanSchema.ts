import { Nullable } from '../types'
import { isBoolean } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeBooleanSchema<
  T0 extends Nullable<boolean> = boolean,
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

  true(message: VaeLocaleMessage = VaeLocale.boolean.true) {
    return this.check({
      fn: v => v === true,
      message: message,
      tag: 'true',
    })
  }

  false(message: VaeLocaleMessage = VaeLocale.boolean.false) {
    return this.check({
      fn: v => v === false,
      message: message,
      tag: 'false',
    })
  }
}
