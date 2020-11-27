import { CreateUrlQueryStringOptions } from './createUrlQueryString'

/**
 * 解析 url 查询字符串。
 *
 * 兼容以 `?` 开头的查询字符串，因此你可以直接传入 `location.search` 的值。
 *
 * @param query 查询字符串
 * @param options 选项
 * @returns 返回 url 查询参数
 * @example
 * ```typescript
 * parseUrlQueryString('x=1&y=z') // => { x: '1', y: 'z' }
 * ```
 */
export function parseUrlQueryString<
  T extends Record<string, string> = Record<string, string>
>(query: string, options?: CreateUrlQueryStringOptions): T {
  if (!query) return {} as any
  const pairSeparator = options?.pairSeparator ?? '='
  const partSeparator = options?.partSeparator ?? '&'
  const parameters: T = {} as any
  query = query.charAt(0) === '?' ? query.substring(1) : query
  for (const pair of query.split(partSeparator)) {
    const [key, value] = pair.split(pairSeparator)
    if (!key) continue
    const decodedKey = decodeURIComponent(key)
    const decodedValue = value ? decodeURIComponent(value) : ''
    ;(parameters as any)[decodedKey] = decodedValue
  }
  return parameters
}
