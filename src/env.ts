import { isFunction, isObject } from './is'

/**
 * 获取全局对象。
 *
 * @returns 返回全局对象
 */
export function getGlobal(): any {
  if (getGlobal._0_ == null) {
    getGlobal._0_ = (
      inBrowser()
        ? window
        : typeof global === 'object'
          ? global
          // see: https://stackoverflow.com/a/6930376
          // eslint-disable-next-line
          : Function('return this')() || (42, eval)('this') || {}
    )
  }
  return getGlobal._0_
}

getGlobal._0_ = undefined as any

/**
 * 检查是否在浏览器环境中。
 *
 * @param callback 在浏览器环境中执行的回调
 * @returns 在浏览器环境中返回 `true`，否则返回 `false`
 */
export function inBrowser(callback?: () => void): boolean {
  if (inBrowser._0_ === undefined) {
    inBrowser._0_ = typeof window === 'object'
      && typeof document === 'object'
      && document.nodeType === 9
  }
  if (inBrowser._0_ && isFunction(callback)) {
    callback()
  }
  return inBrowser._0_
}

inBrowser._0_ = undefined as boolean | undefined

/**
 * 检查是否在 `Node` 环境中。
 *
 * @param callback 在 `Node` 环境中执行的回调
 * @returns 在 `Node` 环境中返回 `true`，否则返回 `false`
 */
export function inNode(callback?: () => void): boolean {
  if (inNode._0_ === undefined) {
    inNode._0_ = typeof process !== 'undefined'
      && process.versions != null
      && process.versions.node != null
  }
  if (inNode._0_ && isFunction(callback)) {
    callback()
  }
  return inNode._0_
}

inNode._0_ = undefined as boolean | undefined

/**
 * 检查是否在微信小程序环境中。
 *
 * @param callback 在微信小程序环境中执行的回调
 * @returns 在微信小程序环境中返回 `true`，否则返回 `false`
 */
export function inWechatMiniProgram(callback?: () => void): boolean {
  if (inWechatMiniProgram._0_ === undefined) {
    inWechatMiniProgram._0_ = typeof wx !== 'undefined'
      && isObject(wx)
      && isFunction(wx.getSystemInfo)
  }
  /* istanbul ignore if */
  if (inWechatMiniProgram._0_ && isFunction(callback)) {
    callback()
  }
  return inWechatMiniProgram._0_
}

inWechatMiniProgram._0_ = undefined as boolean | undefined

/**
 * 检查是否在微信浏览器环境中。
 *
 * @param callback 在微信浏览器环境中执行的回调
 * @returns 在微信浏览器环境返回 `true`，否则返回 `false`
 */
export function inWechatWebview(callback?: () => void): boolean {
  if (inWechatWebview._0_ === undefined) {
    inWechatWebview._0_ = inBrowser()
      && /micromessenger/.test(navigator.userAgent.toLowerCase())
  }
  /* istanbul ignore if */
  if (inWechatWebview._0_ && isFunction(callback)) {
    callback()
  }
  return inWechatWebview._0_
}

inWechatWebview._0_ = undefined as boolean | undefined

/**
 * 检查是否在 `iOS` 设备中。
 *
 * @param callback 在 `iOS` 设备中执行的回调
 * @returns 在 `iOS` 设备中返回 `true`，否则返回 `false`
 */
export function inIOS(callback?: () => void): boolean {
  if (inIOS._0_ === undefined) {
    inIOS._0_ = inBrowser()
      && !!navigator.platform
      && /iPad|iPhone|iPod/.test(navigator.platform)
  }
  /* istanbul ignore if */
  if (inIOS._0_ && isFunction(callback)) {
    callback()
  }
  return inIOS._0_
}

inIOS._0_ = undefined as boolean | undefined
