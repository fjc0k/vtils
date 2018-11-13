import { base64Decode as localBase64Decode } from './_utils/base64'

/**
 * 返回 base64 解码后的字符串。
 *
 * @param str 要解码的字符串
 * @returns 解码后的字符串
 */
export default function base64Decode(str: string): string {
  return localBase64Decode(str)
}
