/**
 * 创建一个包含从 `start` 到 `end`，但不包含 `end` 本身范围数字的数组。
 *
 * @param start 开始数字
 * @param end 结束数字
 * @param step 步进值
 * @returns 返回开始到结束范围内数字组成的数组
 */
export function range(start: number, end: number, step: number = 1): number[] {
  const result: number[] = []
  const increasing = start < end
  while (increasing ? start < end : start > end) {
    result.push(start)
    start += step
  }
  return result
}
