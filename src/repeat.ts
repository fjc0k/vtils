/**
 * 重复 N 次给定字符串。
 *
 * @param str 要重复的字符串
 * @param [n=1] 重复的次数
 * @returns 结果字符串
 */
export default function repeat(str: string | number, n: number = 1) {
  n = Math.round(n <= 0 ? 1 : n)
  let result = ''
  while (n--) {
    result += str
  }
  return result
}
