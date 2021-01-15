const input = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
const output = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm'.split('')
const lookup = input.reduce<Record<string, string>>((m, k, i) => {
  m[k] = output[i]
  return m
}, Object.create(null))

/**
 * 回转 13 位替换式密码。
 *
 * @param str 原文
 * @see https://zh.wikipedia.org/wiki/ROT13
 * @example
 * ```typescript
 * rot13('hello world') // => 'uryyb jbeyq'
 * ```
 */
export function rot13(str: string): string {
  let res = ''
  for (let i = 0, len = str.length; i < len; i++) {
    const char = str.charAt(i)
    res += lookup[char] || char
  }
  return res
}
