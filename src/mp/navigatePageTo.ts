import { AnyObject } from '../types'
import { createUrlQueryString, isUrl } from '../utils'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { getMiniProgramConfig } from './miniProgramConfig'

export function navigatePageTo(
  url: string,
  query?: AnyObject,
  redirect?: boolean,
): Promise<any> {
  return ensureInMiniProgram(mp => {
    return new Promise((resolve, reject) => {
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
      ;(redirect
        ? ((mp.redirectTo as any) as typeof mp.navigateTo)
        : mp.navigateTo)({
        url: url,
        success: resolve,
        fail: () => {
          mp.switchTab({
            url: url,
            success: resolve,
            fail: reject,
          })
        },
      })
    })
  })
}
