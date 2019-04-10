import { formatTemplate, FormatTemplatePatternToValue } from './formatTemplate'
import { toDate } from './toDate'

export type FormatDateValue = string | number | Date

/**
 * 格式化日期显示。
 *
 * @param value 要格式化的值，内部将用 `toDate` 处理为 `Date` 对象
 * @param template 格式化模板
 * @returns 格式化后的值
 */
export function formatDate(value: FormatDateValue, template: string): string {
  const date = toDate(value)
  const patternToValue: FormatTemplatePatternToValue = {
    y: date.getFullYear(), // 年
    m: date.getMonth() + 1, // 月
    d: date.getDate(), // 日
    h: date.getHours(), // 时
    i: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    l: date.getMilliseconds(), // 毫秒
  }
  return formatTemplate(template, patternToValue)
}
