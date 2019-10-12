import Taro from '@tarojs/taro'
import {createURIQuery} from 'vtils'

/**
 * 获取当前页面的绝对路径，包含查询参数。
 *
 * @example
 * ```ts
 * const currentPageUrl = getCurrentPageUrl()
 * // => /pages/Product/Detail?id=10
 * ```
 */
export function getCurrentPageUrl(): string {
  const pages = Taro.getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const path = `/${currentPage.route}`.replace(/\/{2,}/g, '/')
  const query = (currentPage.options || {}) as Record<string, string>
  const queryString = createURIQuery(query)
  const url = `${path}${queryString ? `?${queryString}` : ''}`
  return url
}
