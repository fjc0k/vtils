import { inBrowser } from './inBrowser'

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
    yes =
      inBrowser() &&
      typeof window.navigator === 'object' &&
      /Android/i.test(window.navigator.userAgent || '')
  }
  return yes
}
