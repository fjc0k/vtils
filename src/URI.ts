import { AnyObject } from './enhanceType'
import { forOwn } from './forOwn'
import { isFunction } from './is'

/**
 * 创建 URI 查询字符串。
 *
 * @param parameters 查询参数
 * @returns 返回 URI 查询字符串
 * @example
 * ```ts
 * createURIQuery({ x: 1, y: 'z' }) // => x=1&y=z
 * ```
 */
export function createURIQuery(parameters: AnyObject) {
  const parts: string[] = []
  forOwn(parameters, (value, key) => {
    parts.push(
      `${encodeURIComponent(key as any)}=${encodeURIComponent(value)}`,
    )
  })
  return parts.join('&')
}

export interface ParseURIQueryFormat<T extends Record<string, any>> {
  (parameters: Record<keyof T, string>): T,
}

/**
 * 解析 URI 查询字符串。
 *
 * 兼容以 `?` 开头的查询字符串，因此你可以直接传入 `location.search` 的值。
 *
 * @param query 查询字符串
 * @param format 格式化查询参数
 * @returns 返回 URI 查询参数
 * @example
 * ```ts
 * parseURIQuery('x=1&y=z') // => { x: '1', y: 'z' }
 * parseURIQuery('?x=1&y=z') // => { x: '1', y: 'z' }
 * parseURIQuery(
 *   'x=1&y=z',
 *   parameters => ({
 *     ...parameters,
 *     x: Number(parameters.x),
 *   }),
 * ) // => { x: 1, y: 'z' }
 * ```
 */
export function parseURIQuery<T extends Record<string, any> = Record<string, any>>(query: string, format?: ParseURIQueryFormat<T>): T {
  const parameters: T = {} as any
  query = query.charAt(0) === '?' ? query.substring(1) : query
  query.split('&').forEach(pair => {
    const [key, value] = pair.split('=')
    const decodedKey = decodeURIComponent(key)
    const decodedValue = decodeURIComponent(value)
    ;(parameters as any)[decodedKey] = decodedValue
  })
  return isFunction(format) ? format(parameters) : parameters
}
