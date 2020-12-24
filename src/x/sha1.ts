import crypto, { BinaryLike } from 'crypto'

/**
 * 获取给定值的 sha1 哈希。
 *
 * @param value 给定值
 */
export function sha1(value: BinaryLike): string {
  return crypto.createHash('sha1').update(value).digest('hex')
}
