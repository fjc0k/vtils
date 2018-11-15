const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * 检查 `value` 是否是一个邮件地址。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 * @see http://emailregex.com/
 */
export default function isEmail(value: string): boolean {
  return re.test(value)
}
