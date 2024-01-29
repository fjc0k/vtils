import { inBrowser } from './inBrowser.ts'
import { inMiniProgram } from './inMiniProgram.ts'

let yes!: boolean

/**
 * 检查是否在 Android 设备中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inAndroid()) {
 *   console.log('你在 Android 设备中')
 * }
 * ```
 */
export function inAndroid(): boolean {
  if (yes == null) {
    const mp = inMiniProgram()
    if (mp) {
      const sysInfo = mp.getSystemInfoSync()
      yes = sysInfo.platform === 'android' || /Android/i.test(sysInfo.system)
    } else {
      yes =
        inBrowser() &&
        typeof window.navigator === 'object' &&
        /Android/i.test(window.navigator.userAgent || '')
    }
  }
  return yes
}
