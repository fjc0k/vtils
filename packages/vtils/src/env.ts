const store: Record<string, any> = Object.create(null)

/**
 * 获取全局对象。
 *
 * @returns 返回全局对象
 * @example
 * ```ts
 * // 浏览器中
 * getGlobal() // => window
 * // Node 中
 * getGlobal() // => global
 * ```
 */
export function getGlobal(): any {
  if (store.getGlobal == null) {
    store.getGlobal = (
      inBrowser()
        ? window
        : typeof global === 'object'
          ? global
          // see: https://stackoverflow.com/a/6930376
          // eslint-disable-next-line
          : Function('return this')() || (42, eval)('this') || {}
    )
  }
  return store.getGlobal
}

/* istanbul ignore next */
getGlobal.clearCache = () => {
  delete store.getGlobal
}

/**
 * 检查是否在浏览器环境中。
 *
 * @param callback 在浏览器环境中执行的回调
 * @returns 在浏览器环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 浏览器中
 * inBrowser() // => true
 * inBrowser(
 *   () => console.log('你在浏览器中'),
 * )
 * ```
 */
export function inBrowser(callback?: () => void): boolean {
  if (store.inBrowser === undefined) {
    store.inBrowser = typeof window === 'object'
      && typeof document === 'object'
      && document.nodeType === 9
  }
  if (store.inBrowser && typeof callback === 'function') {
    callback()
  }
  return store.inBrowser
}

/* istanbul ignore next */
inBrowser.clearCache = () => {
  delete store.inBrowser
}

/**
 * 检查是否在 `Node` 环境中。
 *
 * @param callback 在 `Node` 环境中执行的回调
 * @returns 在 `Node` 环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // Node 中
 * inNode() // => true
 * inNode(
 *   () => console.log('你在 Node 中'),
 * )
 * ```
 */
export function inNode(callback?: () => void): boolean {
  if (store.inNode === undefined) {
    store.inNode = typeof process !== 'undefined'
      && process.versions != null
      && process.versions.node != null
  }
  /* istanbul ignore if */
  if (store.inNode && typeof callback === 'function') {
    callback()
  }
  return store.inNode
}

/* istanbul ignore next */
inNode.clearCache = () => {
  delete store.inNode
}

/**
 * 检查是否在微信小程序环境中。
 *
 * @param callback 在微信小程序环境中执行的回调
 * @returns 在微信小程序环境中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 微信小程序中
 * inWechatMiniProgram() // => true
 * inWechatMiniProgram(
 *   () => console.log('你在微信小程序中'),
 * )
 * ```
 */
export function inWechatMiniProgram(callback?: () => void): boolean {
  if (store.inWechatMiniProgram === undefined) {
    store.inWechatMiniProgram = typeof wx === 'object'
      && wx !== null
      && typeof wx.getSystemInfo === 'function'
  }
  /* istanbul ignore if */
  if (store.inWechatMiniProgram && typeof callback === 'function') {
    callback()
  }
  return store.inWechatMiniProgram
}

inWechatMiniProgram.clearCache = () => {
  delete store.inWechatMiniProgram
}

/**
 * 检查是否在微信浏览器环境中。
 *
 * @param callback 在微信浏览器环境中执行的回调
 * @returns 在微信浏览器环境返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // 微信浏览器中
 * inWechatWebview() // => true
 * inWechatWebview(
 *   () => console.log('你在微信浏览器中'),
 * )
 * ```
 */
export function inWechatWebview(callback?: () => void): boolean {
  if (store.inWechatWebview === undefined) {
    store.inWechatWebview = inBrowser()
      && /micromessenger/.test(navigator.userAgent.toLowerCase())
  }
  /* istanbul ignore if */
  if (store.inWechatWebview && typeof callback === 'function') {
    callback()
  }
  return store.inWechatWebview
}

inWechatWebview.clearCache = () => {
  delete store.inWechatWebview
}

/**
 * 检查是否在 `iOS` 设备中。
 *
 * @param callback 在 `iOS` 设备中执行的回调
 * @returns 在 `iOS` 设备中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // iOS 设备中
 * inIOS() // => true
 * inIOS(
 *   () => console.log('你在 iOS 设备中'),
 * )
 * ```
 */
export function inIOS(callback?: () => void): boolean {
  if (store.inIOS === undefined) {
    store.inIOS = inBrowser()
      && !!navigator.platform
      && /iPad|iPhone|iPod/i.test(navigator.platform)
  }
  /* istanbul ignore if */
  if (store.inIOS && typeof callback === 'function') {
    callback()
  }
  return store.inIOS
}

inIOS.clearCache = () => {
  delete store.inIOS
}

/**
 * 检查是否在 `Android` 设备中。
 *
 * @param callback 在 `Android` 设备中执行的回调
 * @returns 在 `Android` 设备中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * // Android 设备中
 * inAndroid() // => true
 * inAndroid(
 *   () => console.log('你在 Android 设备中'),
 * )
 * ```
 */
export function inAndroid(callback?: () => void): boolean {
  if (store.inAndroid === undefined) {
    store.inAndroid = inBrowser()
      && !!navigator.userAgent
      && /Android/i.test(navigator.userAgent)
  }
  /* istanbul ignore if */
  if (store.inAndroid && typeof callback === 'function') {
    callback()
  }
  return store.inAndroid
}

inAndroid.clearCache = () => {
  delete store.inAndroid
}
