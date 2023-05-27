import { phoneNumberRegExpBuilder } from '../regexp'

const regExp = phoneNumberRegExpBuilder.build({ exact: true })

/**
 * 检测传入的值是否可能是中国的手机号码。
 *
 * @public
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isPossibleChineseMobilePhoneNumber('10086') // => false
 * isPossibleChineseMobilePhoneNumber('18087030088') // => true
 * ```
 */
export function isPossibleChineseMobilePhoneNumber(value: string | number) {
  return regExp.test(String(value))
}
