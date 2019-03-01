import { FormatDateValue } from './formatDate'
import toDate from './toDate'

const MINUTE = 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24
const MONTH = DAY * 30
const YEAR = DAY * 365

// function getDaysOfYear(year: number): number {
//   return Math.floor((new Date(year, 11, 31).getTime() - new Date(year, 0, 0).getTime()) / (1000 * 60 * 60 * 24))
// }

/**
 * 格式化日期间距。
 *
 * @param startDate 开始日期
 * @param endDate 结束日期
 * @param template 格式化模板
 * @returns 格式化后的字符串
 */
export default function formatDateDiff(
  startDate: FormatDateValue,
  endDate: FormatDateValue,
  template: string,
): string {
  template = `|${template}|`
  const startTime = toDate(startDate).getTime()
  const endTime = toDate(endDate).getTime()
  const diffTime = endTime - startTime
  const diffSeconds = Math.round(Math.abs(diffTime / 1000))
  const years = Math.floor(diffSeconds / YEAR)
  let months = Math.floor((diffSeconds - years * YEAR) / MONTH)
  let days = Math.floor((diffSeconds - years * YEAR - months * MONTH) / DAY)
  let hours = Math.floor((diffSeconds - years * YEAR - months * MONTH - days * DAY) / HOUR)
  let minutes = Math.floor((diffSeconds - years * YEAR - months * MONTH - days * DAY - hours * HOUR) / MINUTE)
  let seconds = diffSeconds - years * YEAR - months * MONTH - days * DAY - hours * HOUR - minutes * MINUTE
  if (template.indexOf('y') >= 0) {
    if (years > 0) {
      template = template.replace('y', String(years))
    } else {
      template = template.replace(/\|[^|]*?y[^|]*?(?=\|)/, '')
    }
  } else {
    months += years * 12
  }
  if (template.indexOf('m') >= 0) {
    if (months > 0) {
      template = template.replace('m', String(months))
    } else {
      template = template.replace(/\|[^|]*?m[^|]*?(?=\|)/, '')
    }
  } else {
    days += months * 30
  }
  if (template.indexOf('d') >= 0) {
    if (days > 0) {
      template = template.replace('d', String(days))
    } else {
      template = template.replace(/\|[^|]*?d[^|]*?(?=\|)/, '')
    }
  } else {
    hours += days * 24
  }
  if (template.indexOf('h') >= 0) {
    if (hours > 0) {
      template = template.replace('h', String(hours))
    } else {
      template = template.replace(/\|[^|]*?h[^|]*?(?=\|)/, '')
    }
  } else {
    minutes += hours * 60
  }
  if (template.indexOf('i') >= 0) {
    if (minutes > 0) {
      template = template.replace('i', String(minutes))
    } else {
      template = template.replace(/\|[^|]*?i[^|]*?(?=\|)/, '')
    }
  } else {
    seconds += minutes * 60
  }
  if (template.indexOf('s') >= 0) {
    if (seconds > 0) {
      template = template.replace('s', String(seconds))
    } else {
      template = template.replace(/\|[^|]*?s[^|]*?(?=\|)/, '')
    }
  }
  return template.replace(/\|/g, '')
}

// console.log(formatDateDiff(new Date('2018-1-3'), new Date('2019-1-4'), 'd日'))
