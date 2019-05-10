/**
 * 判断给定的年份是否是闰年。
 *
 * @param year 要判断的年份
 * @returns 给定的年份是闰年返回 `true`，否则返回 `false`
 */
export function isLeapYear(year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}
