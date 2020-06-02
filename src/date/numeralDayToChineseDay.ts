const dayMap: Record<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7, string> = {
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
 * ```
 * numeralDayToChineseDay(0) // => 日
 * numeralDayToChineseDay(1) // => 一
 * numeralDayToChineseDay(5) // => 五
 * numeralDayToChineseDay(7) // => 日
 * ```
 *
 * @param day 数字的星期几
 * @returns 返回中文的星期几
 */
export function numeralDayToChineseDay(day: keyof typeof dayMap): string {
  return dayMap[day]
}
