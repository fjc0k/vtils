/**
 * 使用 `value` 来填充（替换） `arr`，从 `start` 位置开始, 到 `end` 位置结束（但不包括 `end` 位置）。
 *
 * @param arr 要填充改变的数组
 * @param valueGenerator 生成填充（替换）值的函数
 * @param start 开始位置
 * @param end 结束位置
 * @returns 填充改变后的数组
 */
export function fill<T>(
  arr: T[],
  valueGenerator?: (
    /** 原值 */
    originalValue: T,
    /** 索引 */
    index: number
  ) => T,
  start?: number,
  end?: number
): any[]

/**
 * 使用 `value` 来填充（替换） `arr`，从 `start` 位置开始, 到 `end` 位置结束（但不包括 `end` 位置）。
 *
 * @param arr 要填充改变的数组
 * @param value 填充（替换）值
 * @param start 开始位置
 * @param end 结束位置
 * @returns 填充改变后的数组
 */
export function fill(
  arr: any[],
  value?: any,
  start?: number,
  end?: number
): any[]

export function fill(
  arr: any[],
  value?: any,
  start: number = 0,
  end: number = arr.length,
): any[] {
  const valueIsFunction = typeof value === 'function'
  const newArr = arr.slice()
  const arrLength = newArr.length
  start = Math.max(0, start < 0 ? arrLength + start : start)
  end = Math.min(arrLength, end < 0 ? arrLength + end : end)
  while (start < end) {
    newArr[start] = valueIsFunction ? value(arr[start], start) : value
    start++
  }
  return newArr
}
