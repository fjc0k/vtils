import { AnyObject } from './enhanceType'
import { forOwn } from './forOwn'

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
