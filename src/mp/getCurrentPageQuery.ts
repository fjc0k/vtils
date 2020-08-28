import { ensureInMiniProgram } from './ensureInMiniProgram'
import { mapValues } from '../utils'

/**
 * 获取当前页面的查询参数，已经对每个值执行了 decodeURIComponent。
 *
 * @returns 返回当前页面的查询参数
 */
export function getCurrentPageQuery<
  T extends Record<string, string | undefined>
>(): T {
  return ensureInMiniProgram(() => {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    const query = mapValues(
      currentPage.options || {},
      value => value && decodeURIComponent(value),
    )
    return (query as any) as T
  })
}
