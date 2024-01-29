import { indent } from './indent.ts'

/**
 * 移除每一行的公共前导空白。
 *
 * @public
 * @param text 文本
 * @returns 返回处理后的结果
 * @example
 * ```typescript
 * dedent(' a\n b') // => 'a\nb'
 * ```
 */
export function dedent(text: string): string

/**
 * 首先，每一行紧跟前导空白的插入值为多行时，保持缩进。
 * 然后，移除每一行的公共前导空白。
 *
 * @public
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回处理后的结果
 * @example
 * ```typescript
 * dedent` a\n b` // => 'a\nb'
 * ```
 */
export function dedent(
  literals: TemplateStringsArray,
  ...interpolations: Array<string | number>
): string

/**
 * 首先，每一行紧跟前导空白的插入值为多行时，保持缩进。
 * 然后，移除每一行的公共前导空白。
 *
 * @public
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回处理后的结果
 * @example
 * ```typescript
 * dedent` a\n b` // => 'a\nb'
 * ```
 */
export function dedent(
  literals: TemplateStringsArray | string,
  ...interpolations: Array<string | number>
): string {
  const text = Array.isArray(literals)
    ? indent(literals as TemplateStringsArray, ...interpolations)
    : (literals as string)

  // 公共的前导空白
  let commonLeadingWhitespace!: string
  // 第一个非空行
  let firstLineIndex!: number
  // 最后一个非空行
  let lastLineIndex!: number

  const lines = text.split(/[\r\n]/g)

  for (let index = 0; index < lines.length; index++) {
    // 当前行的前导空白
    const leadingWhitespace = lines[index].match(/^\s*/)![0]
    // 如果当前行的前导空白等于当前行的长度，则认为这是一个空行，跳过
    if (leadingWhitespace.length !== lines[index].length) {
      lastLineIndex = index
      if (firstLineIndex == null) {
        firstLineIndex = index
      }
      if (
        commonLeadingWhitespace == null ||
        leadingWhitespace.length < commonLeadingWhitespace.length
      ) {
        commonLeadingWhitespace = leadingWhitespace
      }
    }
  }

  return commonLeadingWhitespace == null
    ? text
    : lines
        .slice(firstLineIndex, lastLineIndex + 1)
        .map(line => line.substr(commonLeadingWhitespace.length))
        .join('\n')
}
