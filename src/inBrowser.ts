import isFunction from './isFunction'

let isInBrowser: boolean | undefined

/**
 * 检查是否在浏览器环境中。
 *
 * @param [callback] 在浏览器环境中执行的回调
 * @returns 是（true）或否（false）
 */
export default function inBrowser (callback?: () => void): boolean {
  if (isInBrowser === undefined) {
    isInBrowser = typeof window === 'object'
      && typeof document === 'object'
      && document.nodeType === 9
  }
  if (isInBrowser && isFunction(callback)) {
    callback()
  }
  return isInBrowser
}
