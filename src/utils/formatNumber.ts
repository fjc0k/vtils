/**
 * 格式化数字选项。
 */
export interface FormatNumberOptions {
  /**
   * 整数部分的千分位分隔符。
   *
   * @default ','
   */
  thousandsSeparator?: string

  /**
   * 小数部分的千分位分隔符。
   *
   * @default ''
   */
  thousandthsSeparator?: string
}

/**
 * 格式化数字。
 *
 * @param value 要格式化的数字
 * @param options 选项
 * @returns 返回格式化后的数值
 * @example
 * ```typescript
 * formatNumber(1314.56789) // => '1,314.56789'
 * formatNumber(1314.56789, { thousandsSeparator: ' ' }) // => '1 314.56789'
 * formatNumber(1314.56789, { thousandthsSeparator: ',' }) // => '1,314.567,89'
 * ```
 */
export function formatNumber(
  value: number,
  options?: FormatNumberOptions,
): string {
  const thousandsSeparator = options?.thousandsSeparator ?? ','
  const thousandthsSeparator = options?.thousandthsSeparator ?? ''

  let [integer, decimal = ''] = String(Math.abs(value)).split('.')

  if (thousandsSeparator !== '') {
    let result = ''
    while (integer.length > 3) {
      result = `${thousandsSeparator}${integer.slice(-3)}${result}`
      integer = integer.slice(0, integer.length - 3)
    }
    integer = `${integer}${result}`
  }

  if (thousandthsSeparator !== '') {
    let result = ''
    while (decimal.length > 3) {
      result = `${result}${decimal.slice(0, 3)}${thousandthsSeparator}`
      decimal = decimal.slice(3)
    }
    decimal = `${result}${decimal}`
  }

  const numeral = `${value < 0 ? '-' : ''}${integer}${
    decimal ? `.${decimal}` : ''
  }`

  return numeral
}
