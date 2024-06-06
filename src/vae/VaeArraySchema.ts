import { Nullable } from '../types'
import { isArray } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema, VaeSchemaOf } from './VaeSchema'

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

  /**
   * 数组元素定义
   */
  element(element: VaeArraySchemaElementOf<T>) {
    return this.check({
      fn: element,
      message: '',
      tag: 'element',
    })
  }

  /**
   * 数组非空，即长度应大于 0
   */
  nonempty(message: VaeLocaleMessage = VaeLocale.array.nonempty) {
    return this.check({
      fn: v => v.length > 0,
      message: message,
      tag: 'nonempty',
    })
  }

  /**
   * 数组最小长度
   */
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

  /**
   * 数组最大长度
   */
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

  /**
   * 数组固定长度
   */
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
