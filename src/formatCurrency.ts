export type FormatCurrencyValue = number | string

export interface FormatCurrencyOptions {
  /** 是否启用千分位逗号分隔 */
  thousands?: boolean,
  /** 是否处理小数 */
  decimal?: boolean,
  /** 保留小数位数 */
  precision?: number
}

const defaultOptions: FormatCurrencyOptions = {
  thousands: true,
  decimal: true,
  precision: 2
}

/**
 * 货币值格式化。
 *
 * @param value 要格式化的值
 * @param options 选项
 * @returns 格式化后的值
 */
export default function formatCurrency(value: FormatCurrencyValue, options?: FormatCurrencyOptions): string {
  value = Number(value)
  options = {
    ...defaultOptions,
    ...options
  }
  if (options.decimal) {
    value = value.toFixed(options.precision)
  }
  if (options.thousands) {
    let [integer, decimal = ''] = value.toString().split('.') // tslint:disable-line
    value = ''
    while (integer.length > 3) {
      value = `,${integer.slice(-3)}${value}`
      integer = integer.slice(0, integer.length - 3)
    }
    /* istanbul ignore else */
    if (integer) {
      value = integer + value
    }
    if (decimal) {
      value += `.${decimal}`
    }
  }
  return String(value)
}
