import { isArray, isFunction } from './is'

/**
 * 每一行紧跟前导空白的插入值为多行时，保持缩进。
 *
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回结果
 * @example
 * ```ts
 * const text = 'hello\nworld'
 * indent`  ${text}` // => '  hello\n  world'
 * ```
 */
export function indent(literals: TemplateStringsArray, ...interpolations: any[]): string

/**
 * 给文本每一行的开始加上一个前导字符串。
 *
 * @param text 要操作的文本
 * @param leadingString 前导字符串
 * @returns 返回结果
 * @example
 * ```ts
 * indent('hello\nworld', '-> ')
 * // => '-> hello\n-> world'
 * ```
 */
export function indent(text: string, leadingString: string): string

/**
 * 给文本每一行的开始加上一个前导字符串，前导字符串由回调函数返回。
 *
 * @param text 要操作的文本
 * @param callback 回调函数
 * @returns 返回结果
 * @example
 * ```ts
 * indent(
 *   'hello\nworld',
 *   (lineStr, lineIndex) => `${lineIndex + 1}. `,
 * )
 * // => '1. hello\n2. world'
 * ```
 */
export function indent(text: string, callback: (lineString: string, lineIndex: number) => string): string

export function indent(literals: string | TemplateStringsArray, ...interpolations: any[]): string {
  let result = ''

  // 函数模式
  if (!isArray(literals)) {
    const leadingString = interpolations[0]
    const leadingStringIsFn = isFunction(leadingString)
    result = String(literals)
      .split(/[\r\n]/g)
      .map((item, index) => `${leadingStringIsFn ? leadingString(item, index) : leadingString}${item}`)
      .join('\n')
    return result
  }

  // 标签模板字符串模式
  for (let i = 0; i < interpolations.length; i++) {
    const literal = literals[i]
    let interpolation = interpolations[i]
    const match = i === 0
      ? literal.match(/[\r\n]*(\s*)$/)
      : literal.match(/[\r\n]+(\s*)$/)
    if (match) {
      interpolation = String(interpolation)
        .split(/[\r\n]/g)
        .map((item, index) => `${index === 0 ? '' : match[1]}${item}`)
        .join('\n')
    }
    result += literal
    result += interpolation
  }

  result += literals[literals.length - 1]

  return result
}
