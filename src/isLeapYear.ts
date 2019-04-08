/**
 * 是否是闰年。
 *
 * @param year 要判断的年份
 * @returns 是或否
 */
export function isLeapYear(year: number): boolean {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)
}
