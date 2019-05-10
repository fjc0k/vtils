import { inBrowser } from './inBrowser'
import { isFunction } from './isFunction'
import { isObject } from './isObject'

/**
 * 检查是否在微信小程序环境中。
 *
 * @param callback 在微信小程序环境中执行的回调
 * @returns 在微信小程序环境中返回 `true`，否则返回 `false`
 */
export function inWechatMiniProgram(callback?: () => void): boolean {
  if (inWechatMiniProgram.__FLAG__ === undefined) {
    inWechatMiniProgram.__FLAG__ = !inBrowser()
      && typeof wx !== 'undefined'
      && isObject(wx)
      && isFunction(wx.getSystemInfo)
  }
  /* istanbul ignore if */
  if (inWechatMiniProgram.__FLAG__ && isFunction(callback)) {
    callback()
  }
  return inWechatMiniProgram.__FLAG__ as boolean
}

inWechatMiniProgram.__FLAG__ = undefined as boolean | void
