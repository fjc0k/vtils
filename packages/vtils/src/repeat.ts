import {isPositiveInteger} from './is'

/**
 * 重复 `n` 次给定字符串。
 *
 * @param str 要重复的字符串
 * @param n 重复的次数
 * @returns 返回结果字符串
 * @example
 * ```ts
 * repeat('a', 5) // => aaaaa
 * ```
 */
export function repeat(str: string, n: number): string {
  if (n !== 0 && !isPositiveInteger(n)) {
    throw new RangeError('n 应是 0 或正整数')
  }
  let result = ''
  while (n-- > 0) {
    result += str
  }
  return result
}
