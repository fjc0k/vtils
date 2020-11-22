import { snakeCase } from 'lodash-uni'

/**
 * 转换文本为大写字符串，单词之间带有下划线。
 *
 * @param text 要转换的文本
 * @returns 返回结果
 * @example
 * ```typescript
 * constantCase('test string')
 * // => TEST_STRING
 * ```
 */
export function constantCase(text: string): string {
  return snakeCase(text).toUpperCase()
}
