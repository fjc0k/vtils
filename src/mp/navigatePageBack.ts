import { ensureInMiniProgram } from './ensureInMiniProgram'

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
