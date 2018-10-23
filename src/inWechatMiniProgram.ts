import inBrowser from './inBrowser'
import isFunction from './isFunction'

declare const wx: any

let isInWechatMiniProgram: boolean | undefined

/**
 * 检查是否在微信小程序环境中。
 *
 * @param [callback] 在微信小程序环境中执行的回调
 * @returns 是（true）或否（false）
 */
export default function inWechatMiniProgram(callback?: () => void): boolean {
  if (isInWechatMiniProgram === undefined) {
    isInWechatMiniProgram = !inBrowser() && typeof wx === 'object' && isFunction(wx.getSystemInfo)
  }
  /* istanbul ignore if */
  if (isInWechatMiniProgram && isFunction(callback)) {
    callback()
  }
  return isInWechatMiniProgram
}
