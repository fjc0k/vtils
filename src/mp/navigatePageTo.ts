import { ensureInMiniProgram } from './ensureInMiniProgram'
import { getMiniProgramConfig } from './miniProgramConfig'
import { isUrl } from '../utils'

export function navigatePageTo(url: string, redirect = false): Promise<any> {
  return ensureInMiniProgram(mp => {
    return new Promise((resolve, reject) => {
      if (isUrl(url)) {
        const { webUrlToMiniProgramUrl } = getMiniProgramConfig()
        if (typeof webUrlToMiniProgramUrl === 'function') {
          url = webUrlToMiniProgramUrl(url)
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
