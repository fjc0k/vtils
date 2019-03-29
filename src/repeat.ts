/**
 * 重复 `n` 次给定字符串。
 *
 * @param str 要重复的字符串
 * @param [n=1] 重复的次数
 * @returns 结果字符串
 */
export function repeat(str: string | number, n: number = 1): string {
  let result = ''
  while (n-- > 0) {
    result += str
  }
  return result
}
