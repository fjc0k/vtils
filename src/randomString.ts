/**
 * 生成一个随机字符串。
 *
 * @returns 返回生成的随机字符串
 * @example
 * ```ts
 * randomString() // => m481rnmse1m
 * ```
 */
export function randomString(): string {
  return Math.random().toString(36).substr(2)
}
