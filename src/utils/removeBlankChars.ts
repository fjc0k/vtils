import { blankCharsRegExpBuilder } from '../regexp'

const regExp = blankCharsRegExpBuilder.build({ global: true })

/**
 * 从字符串中移除空白字符。
 *
 * @param value 要操作的字符串
 * @returns 返回移除空白字符后的字符串
 */
export function removeBlankChars(value: string): string {
  return value.replace(regExp, '')
}
