import { inBrowser } from './inBrowser'

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
    yes =
      inBrowser() &&
      typeof window.navigator === 'object' &&
      /iPad|iPhone|iPod/i.test(window.navigator.platform || '')
  }
  return yes
}
