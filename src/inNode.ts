import { isFunction } from './isFunction'

/**
 * 检查是否在 `Node` 环境中。
 *
 * @param callback 在 `Node` 环境中执行的回调
 * @returns 在 `Node` 环境中返回 `true`，否则返回 `false`
 */
export function inNode(callback?: () => void): boolean {
  if (inNode.__FLAG__ === undefined) {
    inNode.__FLAG__ = typeof process !== 'undefined'
      && process.versions != null
      && process.versions.node != null
  }
  if (inNode.__FLAG__ && isFunction(callback)) {
    callback()
  }
  return inNode.__FLAG__ as boolean
}

inNode.__FLAG__ = undefined as boolean | void
