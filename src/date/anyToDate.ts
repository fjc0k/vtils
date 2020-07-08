import { isNumeric } from '../utils'
import { parseISO, toDate } from 'date-fns/esm'

/**
 * 增强版的 toDate，支持：
 * - 秒时间戳、毫秒时间戳；
 * - Date 实例；
 * - 符合 ISO 标准的时间字符串。
 *
 * @param value 要转换的值
 * @returns 返回转换后的 Date 实例
 */
export function anyToDate(value: string | number | Date): Date {
  if (typeof value === 'string') {
    if (isNumeric(value)) {
      value = Number(value)
    } else {
      value = parseISO(value)
    }
  }
  if (typeof value === 'number' && String(value).length === 10) {
    value *= 1000
  }
  return toDate(value)
}
