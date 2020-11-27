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
  return isDataUrl.regex.test(value)
}

isDataUrl.regex = /^data:([a-z]+\/[a-z0-9-+.]+(;[a-z0-9-.!#$%*+.{}|~`]+=[a-z0-9-.!#$%*+.{}()|~`]+)*)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)$/i
