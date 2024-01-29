import { ensureInMiniProgram } from './ensureInMiniProgram.ts'

/**
 * 关闭当前页面，返回上一页面或多级页面。
 *
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
export function navigatePageBack(delta = 1): Promise<any> {
  return ensureInMiniProgram(
    mp =>
      new Promise((resolve, reject) => {
        mp.navigateBack({
          delta: delta,
          success: resolve,
          fail: reject,
        })
      }),
  )
}
