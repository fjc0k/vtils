import base64Encode from './base64Encode'

/**
 * 返回 base64url 编码后的字符串。
 *
 * @param str 要编码的字符串
 * @returns 编码后的字符串
 * @see http://www.ietf.org/rfc/rfc4648.txt
 */
export default function base64UrlEncode(str: string | number): string {
  return base64Encode(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}
