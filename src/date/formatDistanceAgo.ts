import { formatDistanceToNowStrict } from 'date-fns'
import { zhCN } from 'date-fns/locale'

/**
 * 将时间转化为 `xxx前` 表示。
 *
 * @param date 时间
 */
export function formatDistanceAgo(date: number | Date): string {
  const distance = formatDistanceToNowStrict(date, {
    locale: zhCN,
  })
  return `${distance.replace(/\s+/g, '')}前`
}
