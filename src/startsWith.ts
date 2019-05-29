/**
 * 检查 `str` 是否以 `needle` 开头。
 *
 * @param str 要检查的字符串
 * @param needle 要检索的字符串
 * @returns `str` 以 `needle` 开头返回 `true`，否则返回 `false`
 */
export function startsWith(str: string, needle: string): boolean {
  return str.startsWith ? str.startsWith(needle) : str.indexOf(needle) === 0
}
