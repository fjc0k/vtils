import { toDate as valueToDate } from 'date-fns'

/**
 * 将 `value` 转换为 `Date` 实例。
 *
 * @param value 要转换的时间
 * @returns 转换后的 `Date` 实例
 */
export default function toDate(value: string | number | Date): Date {
  return valueToDate(value)
}
