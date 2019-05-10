import { repeat } from './repeat'

/**
 * 在 `str` 两侧填充字符。
 *
 * @param str 要填充的字符串
 * @param length 目标长度
 * @param chars 填充字符
 * @returns 返回填充后的字符串
 */
export function pad(str: string, length: number = 0, chars: string = ' '): string {
  let suffix = ''
  let prefix = ''
  if (length > str.length) {
    const affixLength = length - str.length
    const halfAffixLength = Math.floor(affixLength / 2)
    const affix = repeat(chars, affixLength).slice(0, affixLength)
    prefix = affix.substring(0, halfAffixLength)
    suffix = affix.substring(halfAffixLength, affixLength)
  }
  return prefix + str + suffix
}
