import isFunction from './isFunction'

let isInNode: boolean | undefined

/**
 * 检查是否在 Node 环境中。
 *
 * @param [callback] 在 Node 环境中执行的回调
 * @returns 是（true）或否（false）
 */
export default function inNode(callback?: () => void): boolean {
  if (isInNode === undefined) {
    isInNode = typeof process !== 'undefined' &&
      process.versions != null &&
      process.versions.node != null
  }
  if (isInNode && isFunction(callback)) {
    callback()
  }
  return isInNode
}
