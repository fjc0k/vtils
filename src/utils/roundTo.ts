import { round } from 'lodash-uni'

/**
 * 保留 n 位小数下的 x 舍 y 入。
 *
 * @param number 数值
 * @param precision 精度
 * @param threshold 舍入阈值，等于大于这个值时入，小于这个值时舍
 */
export function roundTo(number: number, precision = 0, threshold = 5): number {
  const [int, decimal] = number.toFixed(precision + 2).split('.')
  return round(
    +`${int}.${decimal.slice(0, precision)}${
      +decimal[precision] >= threshold ? '9' : '0'
    }`,
    precision,
  )
}
