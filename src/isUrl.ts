/**
 * 检查 `value` 是否是一个网址。
 *
 * @param value 要检查的值
 * @returns `value` 是网址返回 `true`，否则返回 `false`
 * @see http://urlregex.com/
 */
export function isUrl(value: string): boolean {
  const re = /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)$/
  return re.test(value)
}
