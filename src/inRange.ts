/** 区间类型 */
export enum InRangeIntervalType {
  /** 开区间，即：`(start, end)` */
  open = 'open',
  /** 闭区间，即：`[start, end]` */
  closed = 'closed',
  /** 左开右闭区间，即：`(start, end]` */
  leftOpenRightClosed = 'leftOpenRightClosed',
  /** 左闭右开区间，即：`[start, end)` */
  leftClosedRightOpen = 'leftClosedRightOpen',
}

/**
 * 检查 `value` 是否在某区间内。
 *
 * @param value 要检查的值
 * @param start 开始值
 * @param end 结束值
 * @param intervalType 区间类型
 * @returns `value` 在区间内返回 `true`，否则返回 `false`
 */
export function inRange(
  value: number,
  start: number,
  end: number,
  intervalType: InRangeIntervalType,
): boolean {
  const leftClosed = intervalType === InRangeIntervalType.closed || intervalType === InRangeIntervalType.leftClosedRightOpen
  const rightClosed = intervalType === InRangeIntervalType.closed || intervalType === InRangeIntervalType.leftOpenRightClosed
  return (
    (leftClosed ? start <= value : start < value)
      && (rightClosed ? value <= end : value < end)
  )
}
