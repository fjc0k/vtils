export type CurrencyFormatValue = number | string

export interface CurrencyFormatOptions {
  thousands?: boolean,
  decimal?: boolean,
  decimalDigits?: number
}

const defaultOptions: CurrencyFormatOptions = {
  thousands: true,
  decimal: true,
  decimalDigits: 2
}

/**
 * 货币值格式化。
 *
 * @param value 要格式化的值
 * @param options 选项
 * @returns 格式化后的值
 */
export default function currencyFormat(value: CurrencyFormatValue, options?: CurrencyFormatOptions): string {
  value = Number(value)
  options = {
    ...defaultOptions,
    ...options
  }
  if (options.decimal) {
    value = value.toFixed(options.decimalDigits)
  }
  if (options.thousands) {
    let [integer, decimal = ''] = value.toString().split('.') // tslint:disable-line
    value = ''
    while (integer.length > 3) {
      value = `,${integer.slice(-3)}${value}`
      integer = integer.slice(0, integer.length - 3)
    }
    if (integer) {
      value = integer + value
    }
    if (decimal) {
      value += `.${decimal}`
    }
  }
  return String(value)
}
