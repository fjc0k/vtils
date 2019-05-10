import { repeat } from './repeat'

/**
 * 在 `str` 左侧填充字符。
 *
 * @param str 要填充的字符串
 * @param length 目标长度
 * @param chars 填充字符
 * @returns 返回填充后的字符串
 */
export function padStart(str: string, length: number = 0, chars: string = ' '): string {
  let prefix = ''
  if (length > str.length) {
    const prefixLength = length - str.length
    prefix = repeat(chars, prefixLength).slice(0, prefixLength)
  }
  return prefix + str
}
