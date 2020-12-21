/**
 * 每一行紧跟前导空白的插入值为多行时，保持缩进。
 *
 * @public
 * @param literals 字面值
 * @param interpolations 插入值
 * @returns 返回处理后的结果
 * @example
 * ```typescript
 * indent` ${'a\nb'}` // => ' a\n b'
 * ```
 */
export function indent(
  literals: TemplateStringsArray,
  ...interpolations: Array<string | number>
): string {
  let result = ''

  for (let i = 0; i < interpolations.length; i++) {
    const literal = literals[i]
    let interpolation = interpolations[i]
    const match = literal.match(/(?:^|[\r\n]+)([^\S\r\n]*)$/)
    if (match && match[1]) {
      interpolation = String(interpolation).replace(
        // fix: 后行断言部分浏览器暂不支持
        // /(?<=[\r\n]+)(?=[^\r\n])/g,
        /([\r\n]+)(?=[^\r\n])/g,
        `$1${match[1]}`,
      )
    }
    result += literal
    result += interpolation
  }

  result += literals[literals.length - 1]

  return result
}
