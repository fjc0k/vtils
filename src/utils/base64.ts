/**
 * base64.js
 * Dan Kogai (https://github.com/dankogai)
 * Licensed under the BSD 3-Clause License
 * https://github.com/dankogai/js-base64/blob/master/LICENSE.md
 *
 * Modified by Jay Fong
 */

type XToY = (value: string) => string

const canUseBufferFrom =
  typeof Buffer !== 'undefined' && typeof Buffer.from === 'function'

const base64Chars =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

const base64Table: { [key: string]: number } = {}
for (let i = 0; i < base64Chars.length; i++) {
  base64Table[base64Chars[i]] = i
}

const fromCharCode = String.fromCharCode

// binaryToAscii
function binaryToAsciiReplacer(str: string) {
  const padlen = [0, 2, 1][str.length % 3]
  const ord =
    (str.charCodeAt(0) << 16) |
    ((str.length > 1 ? str.charCodeAt(1) : 0) << 8) |
    (str.length > 2 ? str.charCodeAt(2) : 0)
  const chars = [
    base64Chars.charAt(ord >>> 18),
    base64Chars.charAt((ord >>> 12) & 63),
    padlen >= 2 ? '=' : base64Chars.charAt((ord >>> 6) & 63),
    padlen >= 1 ? '=' : base64Chars.charAt(ord & 63),
  ]
  return chars.join('')
}
const binaryToAscii: XToY =
  (typeof window !== 'undefined' && window.btoa) ||
  (value => value.replace(/[\s\S]{1,3}/g, binaryToAsciiReplacer))

// utf8ToBinary
const utf8ToBinaryRegExp = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g
function utf8ToBinaryReplacer(str: string) {
  if (str.length < 2) {
    const cc = str.charCodeAt(0)
    return cc < 0x80
      ? str
      : cc < 0x800
      ? fromCharCode(0xc0 | (cc >>> 6)) + fromCharCode(0x80 | (cc & 0x3f))
      : fromCharCode(0xe0 | ((cc >>> 12) & 0x0f)) +
        fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
        fromCharCode(0x80 | (cc & 0x3f))
  }
  const cc =
    0x10000 +
    (str.charCodeAt(0) - 0xd800) * 0x400 +
    (str.charCodeAt(1) - 0xdc00)
  return (
    fromCharCode(0xf0 | ((cc >>> 18) & 0x07)) +
    fromCharCode(0x80 | ((cc >>> 12) & 0x3f)) +
    fromCharCode(0x80 | ((cc >>> 6) & 0x3f)) +
    fromCharCode(0x80 | (cc & 0x3f))
  )
}
const utf8ToBinary: XToY = value =>
  value.replace(utf8ToBinaryRegExp, utf8ToBinaryReplacer)

// utf8ToAscii
const utf8ToAscii: XToY = value => binaryToAscii(utf8ToBinary(value))

// asciiToBinary
function asciiToBinaryReplacer(str: string) {
  const len = str.length
  const padlen = len % 4
  const n =
    (len > 0 ? base64Table[str.charAt(0)] << 18 : 0) |
    (len > 1 ? base64Table[str.charAt(1)] << 12 : 0) |
    (len > 2 ? base64Table[str.charAt(2)] << 6 : 0) |
    (len > 3 ? base64Table[str.charAt(3)] : 0)
  const chars = [
    fromCharCode(n >>> 16),
    fromCharCode((n >>> 8) & 0xff),
    fromCharCode(n & 0xff),
  ]
  chars.length -= [0, 0, 2, 1][padlen]
  return chars.join('')
}
const asciiToBinary: XToY =
  (typeof window !== 'undefined' && window.atob) ||
  (value => value.replace(/\S{1,4}/g, asciiToBinaryReplacer))

// binaryToUtf8
const binaryToUtf8RegExp = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g
function binaryToUtf8Replacer(str: string) {
  switch (str.length) {
    case 4:
      const cp =
        ((0x07 & str.charCodeAt(0)) << 18) |
        ((0x3f & str.charCodeAt(1)) << 12) |
        ((0x3f & str.charCodeAt(2)) << 6) |
        (0x3f & str.charCodeAt(3))
      const offset = cp - 0x10000
      return (
        fromCharCode((offset >>> 10) + 0xd800) +
        fromCharCode((offset & 0x3ff) + 0xdc00)
      )
    case 3:
      return fromCharCode(
        ((0x0f & str.charCodeAt(0)) << 12) |
          ((0x3f & str.charCodeAt(1)) << 6) |
          (0x3f & str.charCodeAt(2)),
      )
    default:
      return fromCharCode(
        ((0x1f & str.charCodeAt(0)) << 6) | (0x3f & str.charCodeAt(1)),
      )
  }
}
const binaryToUtf8: XToY = value =>
  value.replace(binaryToUtf8RegExp, binaryToUtf8Replacer)

// asciiToUtf8
const asciiToUtf8: XToY = value =>
  binaryToUtf8(asciiToBinary(value.replace(/=+$/, '')))

/**
 * Encodes the given UTF8 string to a base64 encoded ASCII string.
 *
 * ```
 * base64Encode('v') // => 'dg=='
 * base64Encode('龙') // => '6b6Z'
 * base64Encode('🐱') // => '8J+QsQ=='
 * ```
 *
 * @public
 * @param value The given UTF8 string.
 * @returns Returns the base64 encoded ASCII string.
 */
export function base64Encode(value: string): string {
  if (canUseBufferFrom) {
    return Buffer.from(value, 'utf8').toString('base64')
  }

  return utf8ToAscii(value)
}

/**
 * Decodes a UTF8 string from the given base64 encoded ASCII string.
 *
 * ```
 * base64Decode('dg==') // => 'v'
 * base64Decode('6b6Z') // => '龙'
 * base64Decode('8J+QsQ==') // => '🐱'
 * ```
 *
 * @public
 * @param value The given base64 encoded ASCII string.
 * @returns Returns the decoded UTF8 string.
 */
export function base64Decode(value: string): string {
  if (canUseBufferFrom) {
    return Buffer.from(value, 'base64').toString('utf8')
  }

  return asciiToUtf8(value)
}

/**
 * Encodes the given UTF8 string to a URL-safe base64url encoded ASCII string.
 *
 * ```
 * base64UrlEncode('v') // => 'dg'
 * base64UrlEncode('龙') // => '6b6Z'
 * base64UrlEncode('🐱') // => '8J-QsQ'
 * ```
 *
 * @public
 * @param value The given UTF8 string.
 * @returns Returns the URL-safe base64url encoded ASCII string.
 */
export function base64UrlEncode(value: string): string {
  return base64Encode(value)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

/**
 * Decodes a UTF8 string from the given URL-safe base64url encoded ASCII string.
 *
 * ```
 * base64UrlDecode('dg') // => 'v'
 * base64UrlDecode('6b6Z') // => '龙'
 * base64UrlDecode('8J-QsQ') // => '🐱'
 * ```
 *
 * @public
 * @param value The given URL-safe base64url encoded ASCII string.
 * @returns Returns the decoded UTF8 string.
 */
export function base64UrlDecode(value: string): string {
  return base64Decode(value.replace(/-/g, '+').replace(/_/g, '/'))
}
