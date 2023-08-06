import { isPlainObject } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema, VaeSchemaOf } from './VaeSchema'

export type VaeObjectSchemaShapeOf<T> = {
  [K in keyof T]: VaeSchemaOf<T[K]>
}

export class VaeObjectSchema<
  T extends Record<any, any> = Record<any, any>,
> extends VaeSchema<T> {
  constructor(
    shape?: VaeObjectSchemaShapeOf<T>,
    message: VaeLocaleMessage = VaeLocale.object.type,
  ) {
    super({
      type: 'object',
    })

    this.check({
      fn: isPlainObject,
      message: message,
    })

    if (shape) {
      this.shape(shape)
    }
  }

  shape(shape: VaeObjectSchemaShapeOf<T>) {
    Object.keys(shape).forEach(key => {
      this.check({
        fn: shape[key],
        path: [key],
        message: '',
      })
    })
  }
}
