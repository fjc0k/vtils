import { inBrowser } from './inBrowser'

let yes!: boolean

/**
 * 检查是否在微信内置浏览器中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inWechatWebView()) {
 *   console.log('你在微信内置浏览器中')
 * }
 * ```
 */
export function inWechatWebView(): boolean {
  if (yes == null) {
    yes =
      inBrowser() &&
      typeof window.navigator === 'object' &&
      /MicroMessenger/i.test(window.navigator.userAgent || '')
  }
  return yes
}
