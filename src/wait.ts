/**
 * 等待一段时间。
 *
 * @param milliseconds 等待时间（单位：`毫秒`）
 */
export function wait(milliseconds: number): Promise<void> {
  return new Promise(
    resolve => setTimeout(resolve, milliseconds),
  )
}
