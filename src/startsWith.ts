/**
 * 检查 `str` 是否以 `needle` 开头。
 *
 * @param str 要检查的字符串
 * @param needle 要检索的字符串
 * @returns 是（true）或否（false）
 */
export default function startsWith (str: string, needle: string): boolean {
  return str.indexOf(needle) === 0
}
