import { truncate } from 'lodash-uni'
import type { TruncateOptions } from 'lodash'

/**
 * 将多行字符串转换为单行字符串。
 *
 * @param value 要转换的字符串
 * @returns 返回结果
 */
export function toSingleLineString(
  value: string,
  truncateOptions?: number | TruncateOptions,
): string {
  let res = value.replace(/[\r\n]+/g, ' ').trim()
  if (truncateOptions) {
    res = truncate(
      res,
      typeof truncateOptions === 'number'
        ? { length: truncateOptions }
        : truncateOptions,
    )
  }
  return res
}
