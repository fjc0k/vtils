import { isFunction } from './isFunction'

/**
 * 检查是否在浏览器环境中。
 *
 * @param callback 在浏览器环境中执行的回调
 * @returns 在浏览器环境中返回 `true`，否则返回 `false`
 */
export function inBrowser(callback?: () => void): boolean {
  if (inBrowser.__FLAG__ === undefined) {
    inBrowser.__FLAG__ = typeof window === 'object'
      && typeof document === 'object'
      && document.nodeType === 9
  }
  if (inBrowser.__FLAG__ && isFunction(callback)) {
    callback()
  }
  return inBrowser.__FLAG__ as boolean
}

inBrowser.__FLAG__ = undefined as boolean | void
