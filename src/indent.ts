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
export function indent(literals: TemplateStringsArray, ...interpolations: any[]): string {
  let result = ''

  for (let i = 0; i < interpolations.length; i++) {
    const literal = literals[i]
    let interpolation = interpolations[i]
    const match = i === 0
      ? literal.match(/[\r\n]?(\s+)$/)
      : literal.match(/[\r\n](\s+)$/)
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
