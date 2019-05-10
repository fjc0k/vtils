import { inBrowser } from './inBrowser'
import { noop } from './noop'

export type OnResizeCallback = (e: Event) => void
export type OnResizeUnbind = () => void

/**
 * 监听窗口大小变动。
 *
 * @param cb 回调函数
 * @returns 返回取消监听函数
 */
export function onResize(cb: OnResizeCallback): OnResizeUnbind {
  if (!inBrowser()) {
    return noop
  }
  const eventType = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(eventType, cb)
  return () => window.removeEventListener(eventType, cb)
}
