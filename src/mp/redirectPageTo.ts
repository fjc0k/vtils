import { AnyObject } from '../types'
import { navigatePageTo } from './navigatePageTo'

/**
 * 关闭当前页面，跳转至某个页面，跳转失败时会尝试切换到 Tab 页。
 *
 * @param url 要跳转去的页面地址
 * @param query 查询参数
 */
export function redirectPageTo(url: string, query?: AnyObject): Promise<any> {
  return navigatePageTo(url, query, true)
}
