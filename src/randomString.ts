/**
 * 返回一个随机的字符串。
 *
 * @returns 随机的字符串
 */
export default function randomString (): string {
  return Math.random().toString(36).substr(2)
}
