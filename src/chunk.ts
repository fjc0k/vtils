import { isFunction } from './isFunction'

/**
 * 将 `array` 拆分成多个 `size` 长度的区块，并将它们组合成一个新数组返回。
 * 如果 `array` 无法等分，且设置了 `filler`，剩余的元素将被 `filler` 填充。
 *
 * @param array 要处理的数组
 * @param size 每个区块的长度，最小为 1
 * @param [filler] 填充物
 * @returns 拆分后的新数组
 */
export function chunk<T, F = never>(array: T[], size: number, filler?: ((index: number) => F) | F): (T | F)[][] {
  if (array.length === 0) {
    return []
  }
  size = Math.max(size, 1)
  const result: (T | F)[][] = []
  const rows = Math.ceil(array.length / size)
  for (let i = 0; i < rows; i++) {
    result.push(array.slice(i * size, (i + 1) * size))
  }
  const lastRow = result[rows - 1]
  if (arguments.length === 3 && lastRow.length < size) {
    const fillerIsFunction = isFunction(filler)
    for (let i = 0, len = size - lastRow.length; i < len; i++) {
      lastRow.push(
        fillerIsFunction ? (filler as any)(i) : filler,
      )
    }
  }
  return result
}
