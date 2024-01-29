import { Nullable } from '../types/index.ts'
import { isArray } from '../utils/index.ts'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale.ts'
import { VaeSchema, VaeSchemaOf } from './VaeSchema.ts'

export type VaeArraySchemaElementOf<T> = T extends Array<infer X>
  ? VaeSchemaOf<X>
  : never

export class VaeArraySchema<
  T0 extends Nullable<any[]> = any[],
  T extends NonNullable<T0> = NonNullable<T0>,
> extends VaeSchema<T0> {
  constructor(
    element?: VaeArraySchemaElementOf<T>,
    message: VaeLocaleMessage = VaeLocale.array.type,
  ) {
    super({
      type: 'array',
    })

    this.check({
      fn: isArray,
      message: message,
    })

    if (element) {
      this.element(element)
    }
  }

  element(element: VaeArraySchemaElementOf<T>) {
    return this.check({
      fn: element,
      message: '',
      tag: 'element',
    })
  }

  nonempty(message: VaeLocaleMessage = VaeLocale.array.nonempty) {
    return this.check({
      fn: v => v.length > 0,
      message: message,
      tag: 'nonempty',
    })
  }

  min(value: number, message: VaeLocaleMessage = VaeLocale.array.min) {
    return this.check({
      fn: v => v.length >= value,
      message: message,
      messageParams: {
        min: value,
      },
      tag: 'min',
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.array.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
      messageParams: {
        max: value,
      },
      tag: 'max',
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.array.length) {
    return this.check({
      fn: v => v.length === value,
      message: message,
      messageParams: {
        length: value,
      },
      tag: 'length',
    })
  }
}
