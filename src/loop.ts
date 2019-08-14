/**
 * 每隔 `interval` 毫秒执行一次 `callback`。
 *
 * @param interval 间隔时间（毫秒）
 * @param callback 回调
 * @returns 返回停止执行的函数
 * @example
 * ```ts
 * // 每隔 1000 毫秒输出一次 hello
 * const stop = loop(
 *   1000,
 *   () => console.log('hello'),
 * )
 * ```
 */
export function loop(interval: number, callback: (...args: any[]) => any) {
  const timer = setInterval(callback, interval)
  return () => clearInterval(timer)
}
