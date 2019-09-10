export interface WaitReturn extends Promise<void> {
  /**
   * 取消等待，不执行后续逻辑。
   */
  cancel: () => void,
}

/**
 * 等待一段时间。
 *
 * @param milliseconds 等待时间（单位：`毫秒`）
 * @example
 * ```ts
 * wait(1000).then(() => {
 *   // 等待 1000 毫秒后执行
 * })
 * ```
 */
export function wait(milliseconds: number): WaitReturn {
  let timer!: number
  const p = new Promise(
    resolve => {
      timer = setTimeout(resolve, milliseconds) as any
    },
  )
  ;(p as any).cancel = () => clearTimeout(timer)
  return p as any
}
