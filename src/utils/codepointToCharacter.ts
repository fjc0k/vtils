/**
 * Unicode 码点转为 UTF8 字符。
 *
 * @param codepoint 码点，支持以 `-` 分割多个码点
 */
export function codepointToCharacter(codepoint: string): string {
  return codepoint
    .split('-')
    .map(str => String.fromCodePoint(parseInt(str, 16)))
    .join('')
}
