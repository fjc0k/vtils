import { isLeapYear } from './isLeapYear'

const monthToDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

/**
 * 获取某月的天数。
 *
 * @param month 要获取的月份
 * @param year 要获取的年份
 * @returns 该月天数
 */
export function getDaysInMonth(
  month: number,
  year: number = new Date().getFullYear(),
): number {
  if (month === 2 && isLeapYear(year)) return 29
  return monthToDays[month - 1]
}
