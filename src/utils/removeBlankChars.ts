// https://github.com/frandiox/normalize-unicode-text/blob/master/src/index.ts
const re =
  /(\s+|[\u180E\u200B-\u200D\u2060\uFEFF]+|[ \u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+|[\u2420\u2422\u2423]+)/gs

/**
 * 从字符串中移除空白字符。
 *
 * @param value 要操作的字符串
 * @returns 返回移除空白字符后的字符串
 */
export function removeBlankChars(value: string): string {
  return value.replace(re, '')
}
