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
    if (charCode >= 0xff01 && charCode <= 0xff5e) {
      result += String.fromCharCode(charCode - 0xfee0)
    } else if (0x3000 === charCode) {
      result += String.fromCharCode(0x0020)
    } else {
      result += value[i]
    }
  }
  return result
}
