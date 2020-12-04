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
  let timer: any
  const result = new Promise(resolve => {
    timer = setTimeout(resolve, milliseconds)
  }) as WaitResult
  result.cancel = () => clearTimeout(timer)
  return result
}

/**
 * 等待一段时间后 reject。
 *
 * @public
 * @param milliseconds 等待时间(毫秒)
 * @example
 * ```typescript
 * wait.reject(1000).catch(() => {
 *   console.log('ok')
 * }) // => 1秒后在控制台打印字符串: ok
 * ```
 */
wait.reject = function reject(milliseconds: number): WaitResult {
  const waitRes = wait(milliseconds)
  const res: WaitResult = waitRes.then(() => Promise.reject()) as any
  res.cancel = waitRes.cancel
  return res
}
