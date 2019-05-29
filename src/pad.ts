import { isPositiveInteger } from './is'
import { repeat } from './repeat'

/**
 * 在 `str` 左侧填充字符。
 *
 * @param str 要填充的字符串
 * @param length 目标长度
 * @param chars 填充字符
 * @returns 返回填充后的字符串
 */
export function padStart(str: string, length: number, chars: string = ' '): string {
  if (!isPositiveInteger(length)) {
    throw new RangeError('length 应为正整数')
  }

  let prefix = ''
  if (length > str.length) {
    const prefixLength = length - str.length
    prefix = repeat(chars, prefixLength).slice(0, prefixLength)
  }
  return prefix + str
}

/**
 * 在 `str` 右侧填充字符。
 *
 * @param str 要填充的字符串
 * @param length 目标长度
 * @param chars 填充字符
 * @returns 返回填充后的字符串
 */
export function padEnd(str: string, length: number, chars: string = ' '): string {
  if (!isPositiveInteger(length)) {
    throw new RangeError('length 应为正整数')
  }

  let suffix = ''
  if (length > str.length) {
    const suffixLength = length - str.length
    suffix = repeat(chars, suffixLength).slice(0, suffixLength)
  }
  return str + suffix
}
