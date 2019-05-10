import { getType } from './getType'

/**
 * 检查 `value` 是否是一个日期。
 *
 * @param value 要检查的值
 * @returns `value` 是日期返回 `true`，否则返回 `false`
 */
export function isDate(value: any): value is Date {
  return getType(value) === 'Date'
}
