export type InRangeInterval = '()' | '(]' | '[)' | '[]'

/**
 * 检查 `value` 是否在某区间内。
 *
 * @param value 要检查的值
 * @param start 开始值
 * @param end 结束值
 * @param interval 区间符号
 * @returns `value` 在区间内返回 `true`，否则返回 `false`
 */
export function inRange(
  value: number,
  start: number,
  end: number,
  interval: InRangeInterval = '()',
): boolean {
  const leftEqual = interval[0] === '['
  const rightEqual = interval[1] === ']'
  return (
    (leftEqual ? start <= value : start < value)
      && (rightEqual ? value <= end : value < end)
  )
}
