import { includes, isArray, values } from '../utils'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeEnumSchema<T extends any = any> extends VaeSchema<T> {
  constructor(
    value: T[] | Record<any, T>,
    message: VaeLocaleMessage = VaeLocale.enum.type,
  ) {
    super({
      type: 'enum',
    })

    const enumValues = isArray(value) ? value : values(value)
    this.check({
      fn: v => includes(enumValues, v),
      message: message,
      messageParams: {
        enum: enumValues,
      },
    })
  }
}
