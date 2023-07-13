import { NumberLocale } from './Locale'
import { MixedSchema } from './mixed'
import { Ref } from './ref'

export interface NumberSchema<T extends number = number>
  extends MixedSchema<T> {
  /** 最小值 */
  min(limit: number | Ref<number>, message?: NumberLocale['min']): this

  /** 最大值 */
  max(limit: number | Ref<number>, message?: NumberLocale['max']): this

  /** 应小于 */
  lessThan(max: number | Ref<number>, message?: NumberLocale['lessThan']): this

  /** 应大于 */
  moreThan(min: number | Ref<number>, message?: NumberLocale['moreThan']): this

  /** 正数 */
  positive(message?: NumberLocale['positive']): this

  /** 负数 */
  negative(message?: NumberLocale['negative']): this

  /** 整数 */
  integer(message?: NumberLocale['integer']): this

  /** ID (positiveInteger 的别名) */
  id(message?: NumberLocale['id']): this

  /** 正整数 */
  positiveInteger(message?: NumberLocale['positiveInteger']): this

  /** 负整数 */
  negativeInteger(message?: NumberLocale['negativeInteger']): this

  /** 非正数 */
  nonPositive(message?: NumberLocale['nonPositive']): this

  /** 非负数 */
  nonNegative(message?: NumberLocale['nonNegative']): this

  /** 非正整数 */
  nonPositiveInteger(message?: NumberLocale['nonPositiveInteger']): this

  /** 非负整数 */
  nonNegativeInteger(message?: NumberLocale['nonNegativeInteger']): this

  truncate(): this

  round(type?: 'floor' | 'ceil' | 'trunc' | 'round'): this
}

export declare function number<T extends number = number>(
  payload?: (schema: NumberSchema<T>) => NumberSchema<T>,
): NumberSchema<T>
