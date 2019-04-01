import { inBrowser } from './inBrowser'

/**
 * 是否是 iOS 设备。
 *
 * @returns 是或否
 */
export function isIOS(): boolean {
  return (
    inBrowser()
      && !!navigator.platform
      && /iPad|iPhone|iPod/.test(navigator.platform)
  )
}
