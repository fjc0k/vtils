import dayjs, {ConfigType} from 'dayjs'
import {isNumeric} from 'vtils'

/**
 * 转换输入的日期为 `Dayjs` 实例。
 *
 * @param date 输入的日期
 * @returns 返回 `Dayjs` 实例
 * @example
 * ```ts
 * // 字符串
 * toDayjs('2019-9-1')
 * // Date 实例
 * toDayjs(new Date(2019, 8, 1))
 * // unix 时间戳
 * toDayjs(1569643555)
 * // Dayjs 实例
 * toDayjs(dayjs())
 * ```
 */
export function toDayjs(date: ConfigType) {
  return (
    isNumeric(date) && String(date).length === 10
      ? dayjs.unix(Number(date))
      : dayjs(date)
  )
}
