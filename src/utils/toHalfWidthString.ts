/**
 * 转换为半角字符串。
 *
 * @param value 要转换的字符串
 * @returns 返回转换后的半角字符串
 */
export function toHalfWidthString(value: string): string {
  let result = ''
  for (let i = 0; i < value.length; i++) {
    const charCode = value.charCodeAt(i)
    if (charCode === 12288) {
      result += String.fromCharCode(charCode - 12256)
    } else if (charCode > 65280 && charCode < 65375) {
      result += String.fromCharCode(charCode - 65248)
    } else {
      result += String.fromCharCode(charCode)
    }
  }
  return result
}
