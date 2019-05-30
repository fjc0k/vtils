import { inNode } from './env'

let encode!: (input: string) => string
let decode!: (input: string) => string

function prepare() {
  /**
   * base64.js
   * Dan Kogai (https://github.com/dankogai)
   * Licensed under the BSD 3-Clause License
   * https://github.com/dankogai/js-base64/blob/master/LICENSE.md
   *
   * Modified by Jay Fong
   */
  const b64chars: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  const b64tab: { [key: string]: number } = b64chars.split('').reduce((res, char, index) => {
    res[char] = index
    return res
  }, {} as any)
  const fcc = String.fromCharCode
  const cbUtob = (c: string): string => {
    if (c.length < 2) {
      const cc = c.charCodeAt(0)
      return cc < 0x80 ? c
        : cc < 0x800 ? (fcc(0xc0 | (cc >>> 6)) + fcc(0x80 | (cc & 0x3f)))
          : (fcc(0xe0 | ((cc >>> 12) & 0x0f)) + fcc(0x80 | ((cc >>> 6) & 0x3f)) + fcc(0x80 | (cc & 0x3f)))
    }
    const cc = 0x10000 + (c.charCodeAt(0) - 0xD800) * 0x400 + (c.charCodeAt(1) - 0xDC00)
    return (fcc(0xf0 | ((cc >>> 18) & 0x07))
    + fcc(0x80 | ((cc >>> 12) & 0x3f))
    + fcc(0x80 | ((cc >>> 6) & 0x3f))
    + fcc(0x80 | (cc & 0x3f)))
  }
  const reUtob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
  const utob = (u: string): string => {
    return u.replace(reUtob, cbUtob)
  }
  const cbEncodeTmp = [0, 2, 1]
  const cbEncode = (ccc: string): string => {
    const padlen = cbEncodeTmp[ccc.length % 3]
    const ord = ccc.charCodeAt(0) << 16
    | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
    | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0))
    const chars = [
      b64chars.charAt(ord >>> 18),
      b64chars.charAt((ord >>> 12) & 63),
      padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
      padlen >= 1 ? '=' : b64chars.charAt(ord & 63),
    ]
    return chars.join('')
  }
  const localBtoa = (b: string): string => b.replace(/[\s\S]{1,3}/g, cbEncode)
  encode = (u: string): string => localBtoa(utob(u))
  const reBtou = new RegExp(
    [
      '[\xC0-\xDF][\x80-\xBF]',
      '[\xE0-\xEF][\x80-\xBF]{2}',
      '[\xF0-\xF7][\x80-\xBF]{3}',
    ].join('|'),
    'g',
  )
  const cbBtou = (cccc: string): string => {
    switch (cccc.length) {
      case 4:
        const cp = ((0x07 & cccc.charCodeAt(0)) << 18)
        | ((0x3f & cccc.charCodeAt(1)) << 12)
        | ((0x3f & cccc.charCodeAt(2)) << 6)
        | (0x3f & cccc.charCodeAt(3))
        const offset = cp - 0x10000
        return (fcc((offset >>> 10) + 0xD800) + fcc((offset & 0x3FF) + 0xDC00))
      case 3:
        return fcc(
          ((0x0f & cccc.charCodeAt(0)) << 12)
          | ((0x3f & cccc.charCodeAt(1)) << 6)
          | (0x3f & cccc.charCodeAt(2)),
        )
      default:
        return fcc(
          ((0x1f & cccc.charCodeAt(0)) << 6)
          | (0x3f & cccc.charCodeAt(1)),
        )
    }
  }
  const btou = (b: string): string => {
    return b.replace(reBtou, cbBtou)
  }
  const cbDecodeTmp = [0, 0, 2, 1]
  const cbDecode = (cccc: string): string => {
    const len = cccc.length
    const padlen = len % 4
    const n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
      | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
      | (len > 2 ? b64tab[cccc.charAt(2)] << 6 : 0)
      | (len > 3 ? b64tab[cccc.charAt(3)] : 0)
    const chars = [
      fcc(n >>> 16),
      fcc((n >>> 8) & 0xff),
      fcc(n & 0xff),
    ]
    chars.length -= cbDecodeTmp[padlen]
    return chars.join('')
  }
  const localAtob = (a: string): string => a.replace(/[\s\S]{1,4}/g, cbDecode)
  decode = (u: string): string => btou(localAtob(u.replace(/=+$/, '')))
}

/**
 * 返回 `base64` 编码后的字符串。
 *
 * @param input 要编码的字符串
 * @returns 返回编码后的 `base64` 字符串
 */
export function base64Encode(input: string): string {
  if (inNode()) {
    return Buffer.from(input).toString('base64')
  }
  if (!encode) {
    prepare()
  }
  return encode(input)
}

/**
 * 返回 `base64` 解码后的字符串。
 *
 * @param input 要解码的 `base64` 字符串
 * @returns 返回解码后的字符串
 */
export function base64Decode(input: string): string {
  if (inNode()) {
    return Buffer.from(input, 'base64').toString()
  }
  /* istanbul ignore next */
  if (!decode) {
    prepare()
  }
  return decode(input)
}

/**
 * 返回 `base64url` 编码后的字符串。
 *
 * @param input 要编码的字符串
 * @returns 返回编码后的 `base64url` 字符串
 * @see http://www.ietf.org/rfc/rfc4648.txt
 */
export function base64UrlEncode(input: string): string {
  return base64Encode(input)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * 返回 `base64url` 解码后的字符串。
 *
 * @param input 要解码的 `base64url` 字符串
 * @returns 返回解码后的字符串
 * @see http://www.ietf.org/rfc/rfc4648.txt
 */
export function base64UrlDecode(input: string): string {
  return base64Decode(input.replace(/-/g, '+').replace(/_/g, '/'))
}
