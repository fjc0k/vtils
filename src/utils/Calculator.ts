import DecimalLight, { Config } from 'decimal.js-light'

export interface CalculatorInstance {
  /**
   * decimal.js 引用。
   */
  decimal: typeof DecimalLight
  /**
   * 根据配置创建一个新的计算器。
   *
   * @param config 配置
   */
  make(
    config?: Config & {
      decimalPlaces?: number
    },
  ): CalculatorInstance
  /**
   * 加。
   *
   * - 加数列表为空时返回 0；
   * - 加数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 加数列表
   */
  add(...values: number[]): number
  /**
   * 减。
   *
   * - 减数列表为空时返回 0；
   * - 减数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 减数列表
   */
  sub(...values: number[]): number
  /**
   * 乘。
   *
   * - 乘数列表为空时返回 0；
   * - 乘数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 乘数列表
   */
  mul(...values: number[]): number
  /**
   * 除。
   *
   * - 除数列表为空时返回 0；
   * - 除数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 除数列表
   */
  div(...values: number[]): number
}

const make: CalculatorInstance['make'] = config => {
  const Decimal = DecimalLight.clone(config)

  const Calculator: CalculatorInstance = {
    decimal: DecimalLight,
    make: make,
    add(...values) {
      return values.length === 0
        ? 0
        : values.length === 1
        ? values[0]
        : values
            .reduce((res, value) => res.add(value), new Decimal(0))
            .toDecimalPlaces(config?.decimalPlaces)
            .toNumber()
    },
    sub(...values) {
      return values.length === 0
        ? 0
        : values.length === 1
        ? values[0]
        : values
            .reduce(
              (res, value, index) =>
                index === 0 ? res.add(value) : res.sub(value),
              new Decimal(0),
            )
            .toDecimalPlaces(config?.decimalPlaces)
            .toNumber()
    },
    mul(...values) {
      return values.length === 0
        ? 0
        : values.length === 1
        ? values[0]
        : values
            .reduce((res, value) => res.mul(value), new Decimal(1))
            .toDecimalPlaces(config?.decimalPlaces)
            .toNumber()
    },
    div(...values) {
      return values.length === 0
        ? 0
        : values.length === 1
        ? values[0]
        : values
            .reduce(
              (res, value, index) =>
                index === 0 ? res.add(value) : res.div(value),
              new Decimal(0),
            )
            .toDecimalPlaces(config?.decimalPlaces)
            .toNumber()
    },
  }

  return Calculator
}

/**
 * 科学计算器。主要是为了避免 js 的浮点数精度计算问题。
 */
export const Calculator = make()
