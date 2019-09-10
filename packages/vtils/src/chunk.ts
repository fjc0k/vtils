import {isFunction, isPositiveInteger} from './is'

/**
 * 将 `arr` 拆分成多个 `size` 长度的区块，并将它们组合成一个新数组返回。
 *
 * 如果 `arr` 无法等分，且设置了 `filler` 函数，剩余的元素将被 `filler` 函数的返回值填充。
 *
 * @param arr 要处理的数组
 * @param size 每个区块的长度
 * @param filler 返回填充物的函数，其接收当前填充物的索引，即第几个填充物（从 `0` 开始），并返回填充物
 * @returns 返回拆分后的新数组
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5, 6]
 * chunk(arr, 2) // => [[1, 2], [3, 4], [5, 6]]
 * chunk(arr, 3) // => [[1, 2, 3], [4, 5, 6]]
 * chunk(arr, 4) // => [[1, 2, 3, 4], [5, 6]]
 * chunk(arr, 4, index => index) // => [[1, 2, 3, 4], [5, 6, 0, 1]]
 * ```
 */
export function chunk<T>(arr: T[], size: number, filler?: (index: number) => T): T[][] {
  if (!isPositiveInteger(size)) {
    throw new RangeError('size 应为正整数')
  }
  if (arr.length === 0) {
    return []
  }
  const result: T[][] = []
  const rows = Math.ceil(arr.length / size)
  for (let i = 0; i < rows; i++) {
    result.push(arr.slice(i * size, (i + 1) * size))
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
