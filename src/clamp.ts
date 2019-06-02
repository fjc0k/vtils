/**
 * 返回限制在最小值和最大值之间的值。
 *
 * @param value 被限制的值
 * @param min 最小值
 * @param max 最大值
 * @returns 返回结果值
 * @example
 * ```ts
 * clamp(50, 0, 100) // => 50
 * clamp(50, 0, 50) // => 50
 * clamp(50, 0, 49) // => 49
 * clamp(50, 51, 100) // => 51
 * ```
 */
export function clamp(value: number, min: number, max: number): number {
  return (
    value <= min
      ? min
      : value >= max
        ? max
        : value
  )
}
