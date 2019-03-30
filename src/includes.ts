import { isArray } from './isArray'
import { isString } from './isString'
import { values } from './values'

/**
 * 检索值 value 是否在数组 arr 中。
 *
 * @param arr 要检索的数组
 * @param value 要检索的值
 * @returns 是或否
 */
function includes<T>(arr: T[], value: T): boolean

/**
 * 检索值 value 是否在对象 obj 中。
 *
 * @param obj 要检索的对象
 * @param value 要检索的值
 * @returns 是或否
 */
function includes<T>(obj: Record<any, T>, value: T): boolean

/**
 * 检索值 value 是否在字符串 str 中。
 *
 * @param str 要检索的字符串
 * @param value 要检索的值
 * @returns 是或否
 */
function includes(str: string, value: string): boolean

function includes(haystack: any, needle: any): boolean {
  haystack = isString(haystack) || isArray(haystack) ? haystack : values(haystack)
  return haystack.indexOf(needle) >= 0
}

export { includes }
