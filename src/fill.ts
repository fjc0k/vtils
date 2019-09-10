import {isInteger} from './is'

export interface FillReturnValue<T> {
  /**
   * 生成填充（替换）值的函数。
   *
   * @param originalValue 原值
   * @param index 索引
   * @returns 返回新值
   */
  (originalValue: T, index: number): T,
}

/**
 * 使用 `value` 来填充（替换） `arr`，从 `start` 位置开始, 到 `end` 位置结束（但不包括 `end` 位置）。
 *
 * @param arr 要填充改变的数组
 * @param returnValue 生成填充（替换）值的函数
 * @param start 开始位置
 * @param end 结束位置
 * @returns 返回填充改变后的数组
 * @example
 * ```ts
 * fill(Array(5), () => 1) // => [1, 1, 1, 1, 1]
 * fill(Array(3), (value, index) => index) // => [0, 1, 2]
 * ```
 */
export function fill<T>(
  arr: T[],
  returnValue: FillReturnValue<T>,
  start: number = 0,
  end: number = arr.length,
): T[] {
  if (!isInteger(start)) {
    throw new RangeError('start 应为整数')
  }

  if (!isInteger(end)) {
    throw new RangeError('end 应为整数')
  }

  const newArr = arr.slice()
  const arrLength = newArr.length
  start = Math.max(0, start < 0 ? arrLength + start : start)
  end = Math.min(arrLength, end < 0 ? arrLength + end : end)
  while (start < end) {
    newArr[start] = returnValue(arr[start], start)
    start++
  }
  return newArr
}
