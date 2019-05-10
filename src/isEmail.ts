/**
 * 检查 `value` 是否是一个邮件地址。
 *
 * @param value 要检查的值
 * @returns `value` 是邮件地址返回 `true`，否则返回 `false`
 * @see http://emailregex.com/
 */
export function isEmail(value: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(value)
}
