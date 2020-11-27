import { isDataUrl } from './isDataUrl'
import { LiteralUnion } from '../types'
import { parseUrlQueryString } from './parseUrlQueryString'

export interface ParseDataUrlResult {
  mimeType: string
  parameters: Record<
    LiteralUnion<'name' | 'charset' | 'base64', string>,
    string
  >
  content: string
  base64: boolean
}

/**
 * 解析 Data URL。
 *
 * @param dataUrl 要解析的 Data URL
 * @returns 返回结果
 */
export function parseDataUrl(dataUrl: string): ParseDataUrlResult {
  const [
    ,
    mimeType = 'text/plain;charset=US-ASCII',
    ,
    ,
    extraParameters = '',
    content = '',
  ] = dataUrl.match(isDataUrl.regex) || []

  const parameters = parseUrlQueryString(
    `${mimeType}${extraParameters}`.replace(/^[^;]*;?/, ''),
    {
      partSeparator: ';',
    },
  )

  return {
    mimeType: decodeURIComponent(mimeType),
    parameters: parameters,
    content: decodeURIComponent(content),
    base64: parameters.base64 != null,
  }
}
