import { FormatDateValue } from './formatDate'
import { toDate } from './toDate'

/**
 * 将 `value` 转换为 unix 时间戳。
 *
 * @param [value] 要转换的值
 * @returns unix 时间戳
 */
export function toUnixTimestamp(value?: FormatDateValue): number {
  return Math.floor(toDate(value).getTime() / 1000)
}
