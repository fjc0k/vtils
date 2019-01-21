export type InRangeInterval = '()' | '(]' | '[)' | '[]'

/**
 * 检查 `value` 是否在某区间内。
 *
 * @param value 要检查的值
 * @param start 开始值
 * @param end 结束值
 * @param [interval='()'] 区间符号
 * @returns `value` 在区间内，返回 `true`；`value` 在区间外，返回 `false`。
 */
export default function inRange(
  value: number,
  start: number,
  end: number,
  interval: InRangeInterval = '()'
): boolean {
  const leftEqual = interval[0] === '['
  const rightEqual = interval[1] === ']'
  return (
    ((leftEqual && value === start) || value > start)
      && ((rightEqual && value === end) || value < end)
  )
}
