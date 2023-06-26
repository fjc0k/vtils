import { AnyObject } from '../types'

export interface CreateUrlQueryStringOptions {
  /**
   * 键值内部的连接符。
   */
  pairSeparator?: string

  /**
   * 各参数间的连接符。
   */
  partSeparator?: string
}

/**
 * 创建 url 查询字符串。
 *
 * @param parameters 查询参数
 * @param options 选项
 * @returns 返回 url 查询字符串
 * @example
 * ```typescript
 * createUrlQueryString({ x: 1, y: 'z' }) // => x=1&y=z
 * ```
 */
export function createUrlQueryString(
  parameters: AnyObject,
  options?: CreateUrlQueryStringOptions,
) {
  const pairSeparator = options?.pairSeparator ?? '='
  const partSeparator = options?.partSeparator ?? '&'
  const parts: string[] = []
  for (const key of Object.keys(parameters)) {
    if (parameters[key] != null) {
      parts.push(
        `${encodeURIComponent(key)}${pairSeparator}${encodeURIComponent(
          parameters[key],
        )}`,
      )
    }
  }
  return parts.join(partSeparator)
}
