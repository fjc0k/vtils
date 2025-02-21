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
    if (0x0020 < charCode && charCode < 0x007f) {
      result += String.fromCharCode(charCode + 0xfee0)
    } else if (0x0020 === charCode) {
      result += String.fromCharCode(0x3000)
    } else {
      result += value[i]
    }
  }
  return result
}
