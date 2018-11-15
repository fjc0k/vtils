import getType from './getType'

/**
 * 检查 `value` 是否是一个日期。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isDate (value: any): value is Date {
  return getType(value) === 'Date'
}
