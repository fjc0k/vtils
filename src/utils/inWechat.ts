import { inBrowser } from './inBrowser'

let yes!: boolean

/**
 * 检查是否在微信内置浏览器中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inWechat()) {
 *   console.log('你在微信内置浏览器中')
 * }
 * ```
 */
export function inWechat(): boolean {
  if (yes == null) {
    yes =
      inBrowser() &&
      typeof window.navigator === 'object' &&
      /MicroMessenger/i.test(window.navigator.userAgent || '')
  }
  return yes
}
