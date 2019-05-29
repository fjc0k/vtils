/**
 * 检查 `str` 是否以 `needle` 结尾。
 *
 * @param str 要检查的字符串
 * @param needle 要检索的字符串
 * @returns `str` 以 `needle` 结尾返回 `true`，否则返回 `false`
 */
export function endsWith(str: string, needle: string): boolean {
  return str.endsWith ? str.endsWith(needle) : str.slice(-needle.length) === needle
}
