import { AnyObject, Omit, ValueOf } from './enhanceType'
import { isArray, isNaN, isString } from './is'
import { values } from './values'

/**
 * 检索值 `value` 是否在数组 `arr` 中。
 *
 * @param arr 要检索的数组
 * @param value 要检索的值
 * @returns `value` 在 `arr` 中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * includes([1, 2, 3], 1) // => true
 * includes([NaN, 2, 3], NaN) // => true
 * includes([1, 2, 3], 4) // => false
 * ```
 */
export function includes<T>(arr: T[], value: T): boolean

/**
 * 检索可枚举属性值 `value` 是否在对象 `obj` 中。
 *
 * @param obj 要检索的对象
 * @param value 要检索的值
 * @returns `value` 在 `obj` 中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * includes({ x: 1, y: 2 }, 1) // => true
 * includes({ x: 1, y: 2 }, 3) // => false
 * ```
 */
export function includes<T extends AnyObject>(obj: T, value: ValueOf<Omit<T, symbol>>): boolean

/**
 * 检索值 `value` 是否在字符串 `str` 中。
 *
 * @param str 要检索的字符串
 * @param value 要检索的值
 * @returns `value` 在 `str` 中返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * includes('hello', 'h') // => true
 * includes('hello', 'll') // => true
 * includes('hello', '123') // => false
 * ```
 */
export function includes(str: string, value: string): boolean

export function includes(haystack: any, needle: any): boolean {
  const _haystack = isString(haystack) || isArray(haystack) ? haystack : values(haystack)

  if (_haystack.includes) return _haystack.includes(needle)

  if (isString(_haystack)) return _haystack.indexOf(needle) > -1

  for (let i = 0, len = _haystack.length; i < len; i++) {
    if (isNaN(needle) && isNaN(_haystack[i])) return true
    if (needle === _haystack[i]) return true
  }

  return false
}
