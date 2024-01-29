import { inBrowser } from './inBrowser.ts'
import { inMiniProgram } from './inMiniProgram.ts'

let yes!: boolean

/**
 * 检查是否在 iOS 设备中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inIOS()) {
 *   console.log('你在 iOS 设备中')
 * }
 * ```
 */
export function inIOS(): boolean {
  if (yes == null) {
    const mp = inMiniProgram()
    if (mp) {
      const sysInfo = mp.getSystemInfoSync()
      yes = sysInfo.platform === 'ios' || /iOS/i.test(sysInfo.system)
    } else {
      yes =
        inBrowser() &&
        typeof window.navigator === 'object' &&
        /iPad|iPhone|iPod/i.test(window.navigator.platform || '')
    }
  }
  return yes
}
