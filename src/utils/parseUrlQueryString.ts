export interface ParseUrlQueryStringFormat<T extends Record<string, any>> {
  (parameters: Record<keyof T, string>): T
}

/**
 * 解析 url 查询字符串。
 *
 * 兼容以 `?` 开头的查询字符串，因此你可以直接传入 `location.search` 的值。
 *
 * @param query 查询字符串
 * @param format 格式化查询参数
 * @returns 返回 url 查询参数
 * @example
 * ```typescript
 * parseUrlQueryString('x=1&y=z') // => { x: '1', y: 'z' }
 * parseUrlQueryString('?x=1&y=z') // => { x: '1', y: 'z' }
 * parseUrlQueryString(
 *   'x=1&y=z',
 *   parameters => ({
 *     ...parameters,
 *     x: Number(parameters.x),
 *   }),
 * ) // => { x: 1, y: 'z' }
 * ```
 */
export function parseUrlQueryString<
  T extends Record<string, any> = Record<string, any>
>(query: string, format?: ParseUrlQueryStringFormat<T>): T {
  const parameters: T = {} as any
  query = query.charAt(0) === '?' ? query.substring(1) : query
  for (const pair of query.split('&')) {
    const [key, value] = pair.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value)
    ;(parameters as any)[decodedKey] = decodedValue
  }
  return typeof format === 'function' ? format(parameters) : parameters
}
