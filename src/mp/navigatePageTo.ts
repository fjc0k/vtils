import { AnyObject } from '../types'
import { createUrlQueryString, isUrl } from '../utils'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { getMiniProgramConfig } from './miniProgramConfig'

/**
 * 跳转至某个页面。
 *
 * @param url 要跳转去的页面地址
 * @param query 查询参数
 * @param redirect 是否关闭当前页面后跳转
 */
export function navigatePageTo(
  url: string,
  query?: AnyObject,
  redirect?: boolean,
): Promise<any> {
  return ensureInMiniProgram(mp => {
    if (isUrl(url)) {
      const { webUrlToMiniProgramUrl } = getMiniProgramConfig()
      if (typeof webUrlToMiniProgramUrl === 'function') {
        url = webUrlToMiniProgramUrl(url)
      }
    }
    if (query && typeof query === 'object') {
      const queryString = createUrlQueryString(query)
      if (queryString) {
        url += (url.indexOf('?') > -1 ? '&' : '?') + queryString
      }
    }
    const switchTab = () =>
      new Promise((resolve, reject) => {
        mp.switchTab({
          url: url,
          success: resolve,
          fail: reject,
        })
      })
    const navigateTo = () =>
      new Promise((resolve, reject) => {
        ;(redirect
          ? ((mp.redirectTo as any) as typeof mp.navigateTo)
          : mp.navigateTo)({
          url: url,
          success: resolve,
          fail: reject,
        })
      })
    // 支付宝下 navigateTo、redirectTo 也能跳转到 Tab 页并不会报错，只是不会显示 Tab 栏
    if (mp.$brand === '支付宝') {
      return switchTab().catch(navigateTo)
    }
    return navigateTo().catch(switchTab)
  })
}
