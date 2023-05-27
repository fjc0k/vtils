import { dataUrlRegExpBuilder } from '../regexp'

const regExp = dataUrlRegExpBuilder.build({ exact: true })

/**
 * 检测传入值是否是 Data URL。
 *
 * @public
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isDataUrl('http://foo.bar') // => false
 * isDataUrl('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D') // => true
 * ```
 */
export function isDataUrl(value: string) {
  return regExp.test(value)
}
