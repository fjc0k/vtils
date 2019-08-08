import { indent } from './indent'
import { isArray } from './is'

/**
 * 首先，每一行紧跟前导空白的插入值为多行时，保持缩进。
 *
 * 然后，移除每一行的公共前导空白。
 *
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回结果
 * @example
 * ```ts
 * const text = 'hello\nworld'
 * dedent`
 *   ${text}
 *     -.-
 * ` // => 'hello\nworld\n  -.-'
 * ```
 */
export function dedent(literals: TemplateStringsArray, ...interpolations: any[]): string

/**
 * 移除文本中每一行的公共前导空白。
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
export function dedent(text: string): string

export function dedent(literals: string | TemplateStringsArray, ...interpolations: any[]): string {
  let text!: string

  if (isArray(literals)) {
    text = indent(literals as any, ...interpolations)
  } else {
    text = literals as any
  }

  // 公共的前导空白
  let commonLeadingWhitespace!: string
  // 第一个非空行
  let firstLineIndex!: number
  // 最后一个非空行
  let lastLineIndex!: number

  const lines = text.split(/[\r\n]/g)

  for (let index = 0, len = lines.length; index < len; index++) {
    // 当前行的前导空白
    const leadingWhitespace = lines[index].match(/^\s*/)![0]
    // 如果当前行的前导空白等于当前行的长度，则认为这是一个空行，跳过
    if (leadingWhitespace.length !== lines[index].length) {
      lastLineIndex = index
      if (firstLineIndex == null) {
        firstLineIndex = index
      }
      if (commonLeadingWhitespace == null || leadingWhitespace.length < commonLeadingWhitespace.length) {
        commonLeadingWhitespace = leadingWhitespace
      }
    }
  }

  return commonLeadingWhitespace == null
    ? text
    : lines.slice(firstLineIndex, lastLineIndex + 1)
      .map(line => line.substr(commonLeadingWhitespace.length))
      .join('\n')
}
