import { camelCase, upperFirst } from 'lodash-uni'
import { PascalCase } from '../types'

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
export function pascalCase<T extends string>(text: T): PascalCase<T> {
  return upperFirst(camelCase(text)) as any
}
