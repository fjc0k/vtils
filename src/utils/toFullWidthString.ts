/**
 * 转换为全角字符串。
 *
 * @param value 要转换的字符串
 * @returns 返回转换后的全角字符串
 */
export function toFullWidthString(value: string): string {
  let result = ''
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i)
    if (charCode === 32) {
      result += String.fromCharCode(12288)
    } else if (charCode < 127) {
      result += String.fromCharCode(value.charCodeAt(i) + 65248)
    } else {
      result += String.fromCharCode(value.charCodeAt(i))
    }
  }
  return result
}
