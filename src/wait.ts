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
export function wait(milliseconds: number): Promise<void> {
  return new Promise(
    resolve => setTimeout(resolve, milliseconds),
  )
}
