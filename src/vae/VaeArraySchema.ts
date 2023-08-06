import { isArray } from '../utils'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeArraySchema<T extends any[] = any[]> extends VaeBaseSchema<T> {
  constructor(schema?: any, message: VaeLocaleMessage = VaeLocale.array.type) {
    super({
      type: 'array',
    })

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

  nonempty(message: VaeLocaleMessage = VaeLocale.array.nonempty) {
    return this.check({
      fn: v => v.length > 0,
      message: message,
    })
  }

  min(value: number, message: VaeLocaleMessage = VaeLocale.array.min) {
    return this.check({
      fn: v => v.length >= value,
      message: message,
      messageParams: {
        min: value,
      },
    })
  }

  max(value: number, message: VaeLocaleMessage = VaeLocale.array.max) {
    return this.check({
      fn: v => v.length <= value,
      message: message,
      messageParams: {
        max: value,
      },
    })
  }

  length(value: number, message: VaeLocaleMessage = VaeLocale.array.length) {
    return this.check({
      fn: v => v.length === value,
      message: message,
      messageParams: {
        length: value,
      },
    })
  }
}
