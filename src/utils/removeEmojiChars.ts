import { emojiRegExpBuilder } from '../regexp'

const regExp = emojiRegExpBuilder.build({ global: true })

/**
 * 从字符串中移除 emoji 字符。
 *
 * @param value 要操作的字符串
 * @returns 返回移除 emoji 字符后的字符串
 */
export function removeEmojiChars(value: string): string {
  return value.replace(regExp, '')
}
