/**
 * 每一行紧跟前导空白的插入值为多行时，保持缩进。
 *
 * ```
 * indent` ${'a\nb'}` // => ' a\n b'
 * ```
 *
 * @public
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回处理后的结果
 */
export function indent(
  literals: TemplateStringsArray,
  ...interpolations: string[]
): string {
  let result = ''

  for (let i = 0; i < interpolations.length; i++) {
    const literal = literals[i]
    let interpolation = interpolations[i]
    const match = literal.match(/(?:^|[\r\n]+)([^\S\r\n]*)$/)
    if (match && match[1]) {
      interpolation = interpolation.replace(
        /(?<=[\r\n]+)(?=[^\r\n])/g,
        match[1],
      )
    }
    result += literal
    result += interpolation
  }

  result += literals[literals.length - 1]

  return result
}
