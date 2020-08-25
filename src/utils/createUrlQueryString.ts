import { AnyObject } from '../types'

/**
 * 创建 url 查询字符串。
 *
 * @param parameters 查询参数
 * @returns 返回 url 查询字符串
 * @example
 * ```typescript
 * createUrlQueryString({ x: 1, y: 'z' }) // => x=1&y=z
 * ```
 */
export function createUrlQueryString(parameters: AnyObject) {
  const parts: string[] = []
  for (const key of Object.keys(parameters)) {
    parts.push(
      `${encodeURIComponent(key)}=${encodeURIComponent(parameters[key])}`,
    )
  }
  return parts.join('&')
}
