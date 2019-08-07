/**
 * 以文本第一行的前导空白串为基准，移除文本每一行的相同前导空白串。
 *
 * @param text 要操作的文本
 * @returns 返回操作后的文本
 * @example
 * ```ts
 * dedent(`
 *   hello
 *   world
 *     -.-
 * `) // => 'hello\nworld\n  -.-'
 * ```
 */
export function dedent(text: string): string {
  const firstLineLeadingWhitespace = text.match(/^[\r\n]*(\s*)/)![1]
  return text
    .replace(new RegExp(`^${firstLineLeadingWhitespace}`, 'gm'), '')
    .replace(/^[\r\n]+|[\r\n]+\s*$/g, '')
}
