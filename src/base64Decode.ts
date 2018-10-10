/**
 * 返回 base64 解码后的字符串。
 *
 * @param str 要解码的字符串
 * @returns 解码后的字符串
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem#Solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
export default function base64Decode(str: string): string {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)) // tslint:disable-line
      .join('')
  )
}
