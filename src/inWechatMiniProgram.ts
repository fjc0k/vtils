import { inBrowser } from './inBrowser'
import { isFunction } from './isFunction'
import { isObject } from './isObject'

let isInWechatMiniProgram: boolean | undefined

/**
 * 检查是否在微信小程序环境中。
 *
 * @param [callback] 在微信小程序环境中执行的回调
 * @returns 是（true）或否（false）
 */
export function inWechatMiniProgram(callback?: () => void): boolean {
  if (isInWechatMiniProgram === undefined) {
    isInWechatMiniProgram = !inBrowser() && typeof wx !== 'undefined' && isObject(wx) && isFunction(wx.getSystemInfo)
  }
  /* istanbul ignore if */
  if (isInWechatMiniProgram && isFunction(callback)) {
    callback()
  }
  return isInWechatMiniProgram
}
