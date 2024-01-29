import { anyToDate, isDate, isValid } from '../date/index.ts'
import { Nullable } from '../types/index.ts'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale.ts'
import { VaeSchema } from './VaeSchema.ts'

export class VaeDateSchema<
  T0 extends Nullable<Date> = Date,
> extends VaeSchema<T0> {
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
