import { includes, isArray, values } from 'lodash-uni'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeEnumSchema<T extends any = any> extends VaeBaseSchema<T> {
  constructor(
    value: T[] | Record<any, T>,
    message: VaeLocaleMessage = VaeLocale.enum.type,
  ) {
    super()
    this.check({
      fn: v =>
        isArray(value) ? includes(value, v) : includes(values(value), v),
      message: message,
    })
  }
}
