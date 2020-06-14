/**
 * @public
 */
export interface WaitResult extends Promise<void> {
  /**
   * 取消等待，不执行后续逻辑。
   */
  cancel: () => void
}

/**
 * 等待一段时间。
 *
 * @public
 * @param milliseconds 等待时间(毫秒)
 * @example
 * ```typescript
 * wait(1000).then(() => {
 *   console.log('ok')
 * }) // => 1秒后在控制台打印字符串: ok
 * ```
 */
export function wait(milliseconds: number): WaitResult {
  let timer: number
  const result = new Promise(resolve => {
    timer = setTimeout(resolve, milliseconds)
  }) as WaitResult
  result.cancel = () => clearTimeout(timer)
  return result
}
