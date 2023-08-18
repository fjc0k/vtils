import { anyToDate, isDate, isValid } from '../date'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

export class VaeDateSchema<T extends Date = Date> extends VaeSchema<T> {
  constructor(message: VaeLocaleMessage = VaeLocale.date.type) {
    super({
      type: 'date',
    })
    this.transform(v => anyToDate(v) as any).check({
      fn: v => isDate(v) && isValid(v),
      message: message,
    })
  }

  min(
    value: Date | string | number,
    message: VaeLocaleMessage = VaeLocale.date.min,
  ) {
    const minDate = anyToDate(value)
    const minTime = minDate.getTime()
    return this.check({
      fn: v => minTime <= v.getTime(),
      message: message,
      messageParams: {
        min: minDate,
      },
      tag: 'min',
    })
  }

  max(
    value: Date | string | number,
    message: VaeLocaleMessage = VaeLocale.date.max,
  ) {
    const maxDate = anyToDate(value)
    const maxTime = maxDate.getTime()
    return this.check({
      fn: v => maxTime >= v.getTime(),
      message: message,
      messageParams: {
        max: maxDate,
      },
      tag: 'max',
    })
  }
}
