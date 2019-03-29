import { reduce } from './reduce'
import { repeat } from './repeat'
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
  const patterns: { [key: string]: number } = {
    y: date.getFullYear(), // 年
    m: date.getMonth() + 1, // 月
    d: date.getDate(), // 日
    h: date.getHours(), // 时
    i: date.getMinutes(), // 分
    s: date.getSeconds(), // 秒
    l: date.getMilliseconds(), // 毫秒
  }
  return reduce(patterns, (result, patternValue, patternKey) => {
    const patternValueStr = String(patternValue)
    const len = patternValueStr.length
    return result.replace(
      new RegExp(`(${patternKey}+)`, 'g'),
      $0 => {
        const n = $0.length
        return (
          n === 1 || n === len ? patternValueStr // n=1或n=len: 直接返回
            : n < len ? patternValueStr.substr(len - n) // n<len: 截取后n位
              : repeat(0, n - len) + patternValueStr // n>len: 前填充0到n位
        )
      },
    )
  }, template)
}
