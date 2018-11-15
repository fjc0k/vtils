import { base64Encode as localBase64Encode } from './libs/base64'

/**
 * 返回 base64 编码后的字符串。
 *
 * @param str 要编码的字符串
 * @returns 编码后的字符串
 */
export default function base64Encode (str: string | number): string {
  return localBase64Encode(String(str))
}
