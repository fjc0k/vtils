import { isArray } from './is'

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

/**
 * 移除文本中每一行的公共前导空白。
 *
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回操作后的文本
 * @example
 * ```ts
 * dedent`
 *   hello
 *   world
 *     -.-
 * ` // => 'hello\nworld\n  -.-'
 * ```
 */
export function dedent(literals: TemplateStringsArray, ...interpolations: string[]): string

export function dedent(literals: string | TemplateStringsArray, ...interpolations: string[]): string {
  let text!: string

  // 抹平函数调用和标签模板调用的差异
  if (isArray(literals)) {
    text = ''
    for (let i = 0; i < interpolations.length; i++) {
      text += literals[i]
      text += interpolations[i]
    }
    text += literals[literals.length - 1]
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
