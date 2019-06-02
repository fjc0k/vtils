/**
 * @see https://stackoverflow.com/a/12830454
 * @see https://github.com/sindresorhus/round-to/blob/master/index.js
 * @see https://github.com/lodash/lodash/blob/master/.internal/createRound.js
 * @see https://blog.caaat.xyz/archives/math_round.html
 */
function nativeRound(fn: Math['round'] | Math['ceil'] | Math['floor'], number: number, precision: number = 0): number {
  if (number < 0 && fn === Math.round) {
    return -nativeRound(fn, -number, precision)
  }
  precision = precision >= 0 ? Math.min(precision, 292) : Math.max(precision, -292)
  if (precision) {
    let pair = `${number}e`.split('e')
    const value = fn(+`${pair[0]}e${+pair[1] + precision}`)
    pair = `${value}e`.split('e')
    return +`${pair[0]}e${+pair[1] - precision}`
  }
  return fn(number)
}

/**
 * 对传入的数字按给定的精度四舍五入后返回。
 *
 * @param number 传入的数字
 * @param precision 精度
 * @returns 返回结果
 * @example
 * ```ts
 * round(3.456) // => 3
 * round(3.456, 1) // => 3.5
 * round(3.456, 2) // => 3.46
 * round(345, -2) // => 300
 * ```
 */
export function round(number: number, precision: number = 0) {
  return nativeRound(Math.round, number, precision)
}

/**
 * 对传入的数字按给定的精度向上取值后返回。
 *
 * @param number 传入的数字
 * @param precision 精度
 * @returns 返回结果
 * @example
 * ```ts
 * roundUp(3.456) // => 4
 * roundUp(3.456, 1) // => 3.5
 * roundUp(3.456, 2) // => 3.46
 * roundUp(345, -2) // => 400
 * ```
 */
export function roundUp(number: number, precision: number = 0) {
  return nativeRound(Math.ceil, number, precision)
}

/**
 * 对传入的数字按给定的精度向下取值后返回。
 *
 * @param number 传入的数字
 * @param precision 精度
 * @returns 返回结果
 * @example
 * ```ts
 * roundDown(3.456) // => 3
 * roundDown(3.456, 1) // => 3.4
 * roundDown(3.456, 2) // => 3.45
 * roundDown(345, -2) // => 300
 * ```
 */
export function roundDown(number: number, precision: number = 0) {
  return nativeRound(Math.floor, number, precision)
}
