import { inBrowser } from './inBrowser'

/**
 * 检测当前设备是否是 `iOS` 设备。
 *
 * @returns 当前设备是 `iOS` 设备返回 `true`，否则返回 `false`
 */
export function isIOS(): boolean {
  return (
    inBrowser()
      && !!navigator.platform
      && /iPad|iPhone|iPod/.test(navigator.platform)
  )
}
