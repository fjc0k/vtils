const re = /^1[3-9][0-9]{9}$/

/**
 * 检测传入的值是否可能是中国的手机号码。
 *
 * ```
 * isPossibleChineseMobilePhoneNumber('10086') // => false
 * isPossibleChineseMobilePhoneNumber('18087030088') // => true
 * ```
 *
 * @param value 要检测的值
 * @returns 返回检测结果
 */
export function isPossibleChineseMobilePhoneNumber(value: string | number) {
  return re.test(String(value))
}
