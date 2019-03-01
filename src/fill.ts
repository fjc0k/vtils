function fill<T>(
  arr: T[],
  value?: (value: T, index: number) => any,
  start?: number,
  end?: number
): any[]

function fill(
  arr: any[],
  value?: any,
  start?: number,
  end?: number
): any[]

/**
 * 使用 `value` 来填充（替换） `arr`，从 `start` 位置开始, 到 `end` 位置结束（但不包括 `end` 位置）。
 *
 * @param arr 要填充改变的数组
 * @param [value] 填充（替换）值
 * @param [start=0] 开始位置
 * @param [end=arr.length] 结束位置
 * @returns 填充改变后的数组
 */
function fill(
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

export default fill
