import { isArray } from './isArray'

/**
 * 计算传入值的总和。
 *
 * @param numbers 传入的数字
 * @returns 返回传入值的总和
 */
export function sum(...numbers: Array<number | number[]>) {
  return numbers.reduce<number>(
    (total, number) => {
      total += isArray(number) ? sum(...number) : number
      return total
    },
    0,
  )
}
