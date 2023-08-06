import { isPlainObject } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeObjectSchema<
  T extends Record<any, any> = Record<any, any>,
> extends VaeSchema<T> {
  constructor(schema?: any, message: VaeLocaleMessage = VaeLocale.object.type) {
    super({
      type: 'object',
    })

    this.check({
      fn: isPlainObject,
      message: message,
    })

    if (schema) {
      this.shape(schema)
    }
  }

  // TODO
  shape(schema: any) {
    Object.keys(schema).forEach(key => {
      this.check({
        fn: schema[key],
        path: [key],
        message: '',
      })
    })
  }
}
