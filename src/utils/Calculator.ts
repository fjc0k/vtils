import Decimal from 'decimal.js'

/**
 * 科学计算器。主要是为了避免 js 的浮点数精度计算问题。
 */
export class Calculator {
  /**
   * 加。
   *
   * - 加数列表为空时返回 0；
   * - 加数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 加数列表
   */
  static add(...values: number[]): number {
    return values.length === 0
      ? 0
      : values.length === 1
      ? values[0]
      : values.reduce((res, value) => res.add(value), new Decimal(0)).toNumber()
  }

  /**
   * 减。
   *
   * - 减数列表为空时返回 0；
   * - 减数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 减数列表
   */
  static sub(...values: number[]): number {
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
          .toNumber()
  }

  /**
   * 乘。
   *
   * - 乘数列表为空时返回 0；
   * - 乘数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 乘数列表
   */
  static mul(...values: number[]): number {
    return values.length === 0
      ? 0
      : values.length === 1
      ? values[0]
      : values.reduce((res, value) => res.mul(value), new Decimal(1)).toNumber()
  }

  /**
   * 除。
   *
   * - 除数列表为空时返回 0；
   * - 除数列表长度为 1 时返回第 1 个的值。
   *
   * @param values 除数列表
   */
  static div(...values: number[]): number {
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
          .toNumber()
  }
}
