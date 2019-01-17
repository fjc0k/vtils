import repeat from './repeat'

/**
 * 在 str 右侧填充字符。
 *
 * @param str 要填充的字符串
 * @param [length=0] 目标长度
 * @param [chars=' '] 填充字符
 * @returns 填充后的字符串
 */
export default function padEnd(str: string, length: number = 0, chars: string = ' '): string {
  let suffix = ''
  if (length > str.length) {
    const suffixLength = length - str.length
    suffix = repeat(chars, length - str.length).slice(0, suffixLength)
  }
  return str + suffix
}
