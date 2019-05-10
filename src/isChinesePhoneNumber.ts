/**
 * 检测 `phoneNumber` 是否是中国的手机号码。
 *
 * @param phoneNumber 要检测的电话号码
 * @param strict 是否严格模式
 * @returns `phoneNumber` 是中国的手机号码返回 `true`，否则返回 `false`
 */
export function isChineseMobilePhoneNumber(phoneNumber: number | string, strict: boolean = false) {
  return (
    strict
      ? /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/
      : /^1[3-9][0-9]{9}$/
  ).test(phoneNumber.toString())
}

/**
 * 检测 `phoneNumber` 是否是中国的座机号码。
 *
 * @param phoneNumber 要检测的电话号码
 * @param strict 是否严格模式
 * @returns `phoneNumber` 是中国的座机号码返回 `true`，否则返回 `false`
 */
export function isChineseLandlinePhoneNumber(phoneNumber: number | string, strict: boolean = false) {
  return (
    strict
      ? /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/
      : /^(?:0[1-9][0-9]{1,2}-)?[2-8][0-9]{6,7}$/
  ).test(phoneNumber.toString())
}

/**
 * 检测 `phoneNumber` 是否是中国的电话号码。
 *
 * @param phoneNumber 要检测的电话号码
 * @param strict 是否严格模式
 * @returns `phoneNumber` 是中国的电话号码返回 `true`，否则返回 `false`
 */
export function isChinesePhoneNumber(phoneNumber: number | string, strict: boolean = false) {
  return (
    isChineseMobilePhoneNumber(phoneNumber, strict)
      || isChineseLandlinePhoneNumber(phoneNumber, strict)
  )
}
