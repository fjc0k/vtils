/**
 * 睡眠 n 毫秒。
 *
 * @param milliseconds 睡眠时间，单位：毫秒
 */
export default function sleep(milliseconds: number): Promise<void> {
  return new Promise(
    resolve => setTimeout(resolve, milliseconds),
  )
}
