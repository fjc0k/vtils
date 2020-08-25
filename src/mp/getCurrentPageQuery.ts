import { ensureInMiniProgram } from './ensureInMiniProgram'

/**
 * 获取当前页面的查询参数。
 *
 * @returns 返回当前页面的查询参数
 */
export function getCurrentPageQuery<T extends Record<string, string>>(): T {
  return ensureInMiniProgram(() => {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const query = currentPage.options || {}
    return (query as any) as T
  })
}
