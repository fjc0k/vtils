import { isFunction, isPositiveInteger } from './is'

/**
 * 将 `array` 拆分成多个 `size` 长度的区块，并将它们组合成一个新数组返回。
 *
 * 如果 `array` 无法等分，且设置了 `filler`，剩余的元素将被 `filler` 填充。
 *
 * @param array 要处理的数组
 * @param size 每个区块的长度
 * @param filler 返回填充物的函数，其接收当前填充物的索引，即第几个填充物（从 `0` 开始），并返回填充物
 * @returns 返回拆分后的新数组
 */
export function chunk<T>(array: T[], size: number, filler?: (index: number) => T): T[][] {
  if (!isPositiveInteger(size)) {
    throw new RangeError('size 应为正整数')
  }
  if (array.length === 0) {
    return []
  }
  const result: T[][] = []
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
