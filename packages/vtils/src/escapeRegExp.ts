/**
 * 转义正则表达式中的特殊字符。
 *
 * @param str 要转换的字符串
 * @returns 返回转换后的字符串
 * @example
 * ```ts
 * escapeRegExp('github.com') // => 'github\\.com'
 * ```
 */
export function escapeRegExp(str: string): string {
  str = String(str)

  const re = /[\\^$.*+?()[\]{}|]/g
  const hasRe = new RegExp(re.source)

  return str && hasRe.test(str)
    ? str.replace(re, '\\$&')
    : str
}
