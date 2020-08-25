import { ensureInMiniProgram } from './ensureInMiniProgram'

/**
 * 获取当前页面的路径（不含查询参数），始终以 `/` 开头。
 *
 * @returns 返回当前页面的路径
 */
export function getCurrentPagePath(): string {
  return ensureInMiniProgram(() => {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const path = `/${currentPage.route}`.replace(/\/{2,}/g, '/')
    return path
  })
}
