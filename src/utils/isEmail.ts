import { emailRegExpBuilder } from '../regexp'

const regExp = emailRegExpBuilder.build({ exact: true })

/**
 * 检测传入值是否是邮箱地址。
 *
 * @public
 * @param value 要检测的值
 * @returns 返回检测结果
 * @example
 * ```typescript
 * isEmail('xx@gmail.com') // => true
 * isEmail('http://foo.bar') // => false
 * ```
 */
export function isEmail(value: string) {
  return regExp.test(value)
}
