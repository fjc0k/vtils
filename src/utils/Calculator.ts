import DecimalLight, { Config, Numeric } from 'decimal.js-light'
import { castArray } from 'lodash-uni'
import { OneOrMore } from '../types'

export interface CalculatorConfig extends Config {
  /** 小数位数 */
  decimalPlaces?: number
}

export type CalculatorPrimitiveValue = Numeric

export type CalculatorFunctionValue = (
  calculator: CalculatorInstance<DecimalLight>,
) => OneOrMore<DecimalLight>

export type CalculatorValue = CalculatorPrimitiveValue | CalculatorFunctionValue

export interface CalculatorInstance<T = number> {
  /**
   * decimal.js 引用。
   */
  decimal: typeof DecimalLight
  /**
   * 根据配置创建一个新的计算器。
   *
   * @param config 配置
   */
  make(config?: CalculatorConfig): CalculatorInstance
  /**
   * 加。
   *
   * - 加数列表为空时返回 0；
   * - 加数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 加数列表
   */
  add(...values: CalculatorValue[]): T
  /**
   * 减。
   *
   * - 减数列表为空时返回 0；
   * - 减数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 减数列表
   */
  sub(...values: CalculatorValue[]): T
  /**
   * 乘。
   *
   * - 乘数列表为空时返回 0；
   * - 乘数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 乘数列表
   */
  mul(...values: CalculatorValue[]): T
  /**
   * 除。
   *
   * - 除数列表为空时返回 0；
   * - 除数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 除数列表
   */
  div(...values: CalculatorValue[]): T
  /**
   * 转换为数字。
   *
   * @param value 值
   */
  toNumber(value: CalculatorPrimitiveValue): T
}

const make: CalculatorInstance['make'] = config => {
  const Decimal = DecimalLight.clone(config)

  const getValue = (value: CalculatorValue) =>
    typeof value === 'function'
      ? value({
          ...Calculator,
          toNumber: (value: any) => new Decimal(value),
        } as any as CalculatorInstance<DecimalLight>)
      : value

  const Calculator: CalculatorInstance = {
    decimal: DecimalLight,
    make: make,
    add(...values) {
      return this.toNumber(
        values.length === 0
          ? 0
          : values.reduce<DecimalLight>(
              (res, value) =>
                castArray(getValue(value)).reduce<DecimalLight>(
                  (res, item) => res.add(item),
                  res,
                ),
              new Decimal(0),
            ),
      )
    },
    sub(...values) {
      return this.toNumber(
        values.length === 0
          ? 0
          : values.reduce<DecimalLight>(
              (res, value, index) =>
                castArray(getValue(value)).reduce<DecimalLight>(
                  (res, item, index2) =>
                    index === 0 && index2 === 0 ? res.add(item) : res.sub(item),
                  res,
                ),
              new Decimal(0),
            ),
      )
    },
    mul(...values) {
      return this.toNumber(
        values.length === 0
          ? 0
          : values.reduce<DecimalLight>(
              (res, value) =>
                castArray(getValue(value)).reduce<DecimalLight>(
                  (res, item) => res.mul(item),
                  res,
                ),
              new Decimal(1),
            ),
      )
    },
    div(...values) {
      return this.toNumber(
        values.length === 0
          ? 0
          : values.reduce<DecimalLight>(
              (res, value, index) =>
                castArray(getValue(value)).reduce<DecimalLight>(
                  (res, item, index2) =>
                    index === 0 && index2 === 0 ? res.add(item) : res.div(item),
                  res,
                ),
              new Decimal(0),
            ),
      )
    },
    toNumber(value) {
      return new Decimal(value)
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
