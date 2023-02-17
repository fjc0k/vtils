import { formatDistanceStrict, isBefore } from 'date-fns/esm'
import { zhCN } from 'date-fns/esm/locale'

/**
 * 将时间转化为 `xxx前/后` 表示。
 *
 * @param date 时间
 * @param baseDate 基准时间（默认当前时间）
 */
export function formatDistancePlus(
  date: Date,
  baseDate: Date = new Date(),
): string {
  const suffix = isBefore(date, baseDate) ? '前' : '后'
  const distance = formatDistanceStrict(date, baseDate, {
    locale: zhCN,
  }).replace(/\s+/g, '')
  return `${distance}${suffix}`
}
