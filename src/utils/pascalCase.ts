import { camelCase, upperFirst } from 'lodash-es'

/**
 * 转换文本为没有分隔符的大写单词字符串。
 *
 * @param text 要转换的文本
 * @returns 返回结果
 * @example
 * ```typescript
 * pascalCase('test string')
 * // => TestString
 * ```
 */
export function pascalCase(text: string): string {
  return upperFirst(camelCase(text))
}
