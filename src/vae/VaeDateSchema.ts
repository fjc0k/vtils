import { anyToDate, isDate, isValid } from '../date'
import { Nullable } from '../types'
import { VaeLocale, VaeLocaleMessage } from './VaeLocale'
import { VaeSchema } from './VaeSchema'

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

  /**
   * 最小日期
   */
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

  /**
   * 最大日期
   */
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
