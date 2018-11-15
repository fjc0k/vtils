const re = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www\.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w\-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.!/\\\w]*))?)/

/**
 * 检查 `value` 是否是一个网址。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 * @see http://urlregex.com/
 */
export default function isUrl (value: string): boolean {
  return re.test(value)
}
