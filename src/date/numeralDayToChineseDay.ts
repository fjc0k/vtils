/**
 * 数字星期。
 *
 * @public
 */
export type NumeralDay = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

const dayMap: Record<NumeralDay, string> = {
  0: '日',
  1: '一',
  2: '二',
  3: '三',
  4: '四',
  5: '五',
  6: '六',
  7: '日',
}

/**
 * 数字星期转中文星期。`0` 和 `7` 都视为星期日。
 *
 * @public
 * @param day 数字的星期几
 * @returns 返回中文的星期几
 * @example
 * ```typescript
 * numeralDayToChineseDay(0) // => 日
 * numeralDayToChineseDay(1) // => 一
 * numeralDayToChineseDay(5) // => 五
 * numeralDayToChineseDay(7) // => 日
 * ```
 */
export function numeralDayToChineseDay(day: NumeralDay): string {
  return dayMap[day]
}
