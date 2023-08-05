import { isArray } from 'lodash-uni'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeArraySchema<T extends any[] = any[]> extends VaeBaseSchema<T> {
  constructor(schema?: any, message: VaeLocaleMessage = VaeLocale.array.type) {
    super()

    this.check({
      fn: isArray,
      message: message,
    })

    if (schema) {
      this.element(schema)
    }
  }

  // TODO
  element(schema: any) {
    this.check({
      fn: schema,
      message: '',
      tag: 'element',
    })
  }

  min(value: number, message: VaeLocaleMessage = VaeLocale.array.min) {
    return this.check({
      fn: v => v.length >= value,
      message: message,
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.array.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.array.length) {
    return this.check({
      fn: v => v.length === value,
      message: message,
    })
  }
}
