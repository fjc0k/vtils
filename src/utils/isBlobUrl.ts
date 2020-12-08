/**
 * 检测传入值是否是 Blob URL，也称 Object URL。
 *
 * @public
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isBlobUrl('http://foo.bar') // => false
 * isBlobUrl('blob:https://example.org/9115d58c-bcda-ff47-86e5-083e9a215304') // => true
 * ```
 */
export function isBlobUrl(value: string) {
  return isBlobUrl.regex.test(value)
}

isBlobUrl.regex = /^blob:.+\/[\w-]{36,}(?:#.+)?$/
