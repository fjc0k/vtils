import { inBrowser } from './inBrowser'
import { isFunction } from './isFunction'

let isInWechatWebview: boolean | undefined

/**
 * 检查是否在微信浏览器环境中。
 *
 * @param [callback] 在微信浏览器环境中执行的回调
 * @returns 是（true）或否（false）
 */
export function inWechatWebview(callback?: () => void): boolean {
  if (isInWechatWebview === undefined) {
    isInWechatWebview = inBrowser() && /micromessenger/.test(navigator.userAgent.toLowerCase())
  }
  /* istanbul ignore if */
  if (isInWechatWebview && isFunction(callback)) {
    callback()
  }
  return isInWechatWebview
}
