let yes!: boolean

/**
 * 检查是否在 Node.js 中。
 *
 * @returns 返回检查结果
 * @example
 * ```typescript
 * if (inNodeJS()) {
 *   console.log('你在 Node.js 中')
 * }
 * ```
 */
export function inNodeJS(): boolean {
  if (yes == null) {
    yes =
      typeof global === 'object' &&
      typeof global['process'] === 'object' &&
      typeof global['process']['versions'] === 'object' &&
      global['process']['versions']['node'] != null
  }
  return yes
}
