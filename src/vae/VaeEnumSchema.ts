import { includes, isArray, values } from '../utils'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeEnumSchema<T extends any = any> extends VaeBaseSchema<T> {
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
