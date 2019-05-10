import { FormatDateValue } from './formatDate'
import { isDate } from './isDate'
import { isNull } from './isNull'
import { isString } from './isString'
import { isUndefined } from './isUndefined'

const cache = Object.create(null)

//                     1. 年     2. 月      3. 日          4. 时         5. 分          6. 秒          7. 毫秒
const REGEX_PARSE = /^(\d{4})-?(\d{1,2})-?(\d{0,2}).*?(?:(\d{1,2})(?::(\d{1,2}))?(?::(\d{1,2}))?(?:\.(\d{1,3}))?)?$/

/**
 * 将 `value` 转换为 `Date` 实例。
 *
 * @param value 要转换的值
 * @returns 返回转换后的 `Date` 实例
 * @see https://github.com/iamkun/dayjs/blob/master/src/index.js#L46
 */
export function toDate(value?: FormatDateValue): Date {
  let reg: RegExpMatchArray

  if (isNull(value)) return new Date(NaN)

  if (isUndefined(value)) return new Date()

  if (isDate(value)) return new Date(value)

  if (value in cache) return new Date(cache[value])

  if (/^\d+$/.test(value as string)) {
    value = String(value).length === 10 ? +value * 1000 : +value
  }

  if (isString(value) && (/.*[^Z]$/i.test(value)) && (reg = value.match(REGEX_PARSE))) {
    const regNum: number[] = reg.slice(1, 8).map(s => parseInt(s, 10))
    return new Date(
      regNum[0], regNum[1] - 1, regNum[2],
      regNum[3] || 0, regNum[4] || 0, regNum[5] || 0,
      regNum[6] || 0,
    )
  }

  return (cache[value] = new Date(value))
}
