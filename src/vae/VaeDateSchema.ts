import { anyToDate, isDate, isValid } from '../date'
import { VaeBaseSchema } from './VaeBaseSchema'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'

export class VaeDateSchema<T extends Date = Date> extends VaeBaseSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.date.type) {
    super()
    this.transform(v => anyToDate(v) as any).check({
      fn: v => isDate(v) && isValid(v),
      message: message,
    })
  }

  min(value: Date, message: VaeLocaleMessage = VaeLocale.date.min) {
    this.check({
      fn: v => value.getTime() <= v.getTime(),
      message: message,
    })
  }

  max(value: Date, message: VaeLocaleMessage = VaeLocale.date.max) {
    this.check({
      fn: v => value.getTime() >= v.getTime(),
      message: message,
    })
  }
}
