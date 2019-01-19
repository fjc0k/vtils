import inBrowser from './inBrowser'
import noop from './noop'

/**
 * 监听窗口大小变动。
 *
 * @param cb 回调函数
 * @returns 取消监听函数
 */
export default function onResize(cb: (e: Event) => void): () => void {
  if (!inBrowser()) {
    return noop
  }
  const eventType = 'orientationchange' in window ? 'orientationchange' : 'resize'
  window.addEventListener(eventType, cb)
  return () => window.removeEventListener(eventType, cb)
}
