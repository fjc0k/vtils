import { j2xParser as J2XParser, J2xOptionsOptional } from 'fast-xml-parser'

const attrTagName = '@__attr__@' as const
const textTagName = '@__text__@' as const
const cdataTagName = '@__cdata__@' as const

/**
 * 创建 XML 文本。
 *
 * @param data 数据
 * @param options 选项
 */
export function createXml(data: any, options?: J2xOptionsOptional): string {
  return new J2XParser({
    ...options,
    attrNodeName: attrTagName,
    textNodeName: textTagName,
    cdataTagName: cdataTagName,
  }).parse(data)
}

createXml.attr = function <T = any>(value: T): any {
  return { [attrTagName]: value }
}

createXml.text = function <T = any>(value: T): any {
  return { [textTagName]: value }
}

createXml.cdata = function <T = any>(value: T): any {
  return { [cdataTagName]: value }
}
