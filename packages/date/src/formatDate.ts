import {ConfigType} from 'dayjs'
import {toDayjs} from './toDayjs'

/**
 * 格式化日期。
 *
 * @param date 日期
 * @param template 模板字符串([可用的格式化字符](https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#list-of-all-available-formats))
 * @returns 返回格式化后的日期字符串
 * @example
 * ```ts
 * formatDate('2019-9-1', 'YYYY年M月D日') // => 2019年9月1日
 * ```
 */
export function formatDate(date: ConfigType, template: string) {
  return toDayjs(date).format(template)
}
