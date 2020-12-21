import { parse, X2jOptionsOptional } from 'fast-xml-parser'

/**
 * 解析 XML 文本。
 *
 * @param text XML 文本
 * @param options 选项
 */
export function parseXml<T>(text: string, options?: X2jOptionsOptional): T {
  return parse(text, options)
}
