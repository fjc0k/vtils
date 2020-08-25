import { createUrlQueryString } from '../utils'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { getCurrentPagePath } from './getCurrentPagePath'
import { getCurrentPageQuery } from './getCurrentPageQuery'

/**
 * 获取当前页面的地址（包含查询参数）。
 *
 * @returns 返回当前页面的地址
 */
export function getCurrentPageUrl(): string {
  return ensureInMiniProgram(() => {
    const path = getCurrentPagePath()
    const query = getCurrentPageQuery()
    const queryString = createUrlQueryString(query)
    const url = `${path}${queryString ? `?${queryString}` : ''}`
    return url
  })
}
