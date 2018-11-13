/**
 * 创建一个包含从 `start` 到 `end`，但不包含 `end` 本身范围数字的数组。
 *
 * @param start 开始数字
 * @param [end] 结束数字
 * @param [step] 步进值
 * @returns 开始到结束范围内数字组成的数组
 */
export default function range(start: number, end?: number, step?: number): number[] {
  if (arguments.length === 1) {
    if (start > 0) {
      end = start
      start = 0
    } else {
      end = 0
    }
    step = 1
  } else {
    step = step == null ? 1 : step
  }
  const result: number[] = []
  while (start < end) {
    result.push(start)
    start += step
  }
  return result
}
