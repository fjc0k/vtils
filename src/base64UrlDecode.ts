import base64Decode from './base64Decode'
import repeat from './repeat'

/**
 * 返回 base64url 解码后的字符串。
 *
 * @param str 要解码的字符串
 * @returns 解码后的字符串
 * @see http://www.ietf.org/rfc/rfc4648.txt
 */
export default function base64UrlDecode(str: string): string {
  const remainder = str.length % 4
  if (str !== '' && remainder > 0) {
    str += repeat('=', 4 - remainder)
  }
  return base64Decode(str.replace(/-/g, '+').replace(/_/g, '/'))
}
