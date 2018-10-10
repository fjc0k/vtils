/**
 * 返回 base64 编码后的字符串。
 *
 * @param str 要编码的字符串
 * @returns 编码后的字符串
 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem#Solution_1_%E2%80%93_escaping_the_string_before_encoding_it
 */
export default function base64Encode(str: string | number): string {
  return btoa(
    encodeURIComponent(str as string)
      .replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode(`0x${p1}` as any)
        }
      )
  )
}
