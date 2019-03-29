/**
 * 检查 `str` 是否以 `needle` 结尾。
 *
 * @param str 要检查的字符串
 * @param needle 要检索的字符串
 * @returns 是（true）或否（false）
 */
export function endsWith(str: string, needle: string): boolean {
  return str.slice(-needle.length) === needle
}
