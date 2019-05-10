import { inBrowser } from './inBrowser'
import { isFunction } from './isFunction'

/**
 * 检查是否在微信浏览器环境中。
 *
 * @param callback 在微信浏览器环境中执行的回调
 * @returns 在微信浏览器环境返回 `true`，否则返回 `false`
 */
export function inWechatWebview(callback?: () => void): boolean {
  if (inWechatWebview.__FLAG__ === undefined) {
    inWechatWebview.__FLAG__ = inBrowser()
      && /micromessenger/.test(navigator.userAgent.toLowerCase())
  }
  /* istanbul ignore if */
  if (inWechatWebview.__FLAG__ && isFunction(callback)) {
    callback()
  }
  return inWechatWebview.__FLAG__ as boolean
}

inWechatWebview.__FLAG__ = undefined as boolean | void
