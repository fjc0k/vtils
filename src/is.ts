import {getGlobal} from './env'
import {getType} from './getType'
import {ii} from './ii'

/**
 * 检查 `value` 是否是一个数组。
 *
 * @param value 要检查的值
 * @returns `value` 是数组返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isArray(['x']) // => true
 * isArray('x') // => false
 * ```
 */
export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}

/**
 * 检查 `value` 是否是一个布尔值。
 *
 * @param value 要检查的值
 * @returns `value` 是布尔值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isBoolean(true) // => true
 * isBoolean(false) // => true
 * isBoolean('true') // => false
 * ```
 */
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

/**
 * 检查 `value` 是否是合法的中国大陆居民 `18` 位身份证号码。
 *
 * @param value 要检查的值
 * @returns `value` 是合法的中国大陆居民 `18` 位身份证号码返回 `true`，否则返回 `false`
 * @see https://my.oschina.net/labrusca/blog/306116
 * @see http://developer.51cto.com/art/201803/568755.htm
 * @example
 * ```ts
 * isChineseIDCardNumber('123456') // => false
 * ```
 */
export function isChineseIDCardNumber(value: string): boolean {
  const testRegExp = /^[1-9]([0-9]{14}|[0-9]{16}[0-9Xx])$/
  const areaMap = [11, 12, 13, 14, 15, 21, 22, 23, 31, 32, 33, 34, 35, 36, 37, 41, 42, 43, 44, 45, 46, 50, 51, 52, 53, 54, 61, 62, 63, 64, 65, 71, 81, 82]
  const weightMap = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  const codeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

  const isValidDate = (year: number, month: number, day: number): boolean => {
    const date = new Date(year, month - 1, day)
    return (
      date.getFullYear() === year
        && date.getMonth() + 1 === month
        && date.getDate() === day
        && date.getTime() < new Date().getTime()
        && year > 1900
    )
  }

  const len = value.length

  // 长度错误
  if (len !== 15 && len !== 18) {
    return false
  }

  // 模式校验
  if (!testRegExp.test(value)) {
    return false
  }

  // 地区校验
  if (areaMap.indexOf(+value.substr(0, 2)) === -1) {
    return false
  }

  // 15 位
  if (len === 15) {
    return isValidDate(
      +`19${value.substr(6, 2)}`,
      +value.substr(8, 2),
      +value.substr(10, 2),
    )
  }

  // 18 位
  if (!isValidDate(
    +value.substr(6, 4),
    +value.substr(10, 2),
    +value.substr(12, 2),
  )) {
    return false
  }

  // 校验码
  const sum = value.split('').slice(0, 17).reduce(
    (s, num, index) => {
      s += +num * weightMap[index]
      return s
    },
    0,
  )
  return codeMap[sum % 11] === value[17].toUpperCase()
}

/**
 * 检测 `number` 是否可能是中国的手机号码。
 *
 * @param number 要检测的号码
 * @returns `number` 可能是中国的手机号码返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPossibleChineseMobilePhoneNumber(18000030000) // => true
 * isPossibleChineseMobilePhoneNumber(10086) // => false
 * ```
 */
export function isPossibleChineseMobilePhoneNumber(number: number | string) {
  return /^1[3-9][0-9]{9}$/.test(String(number))
}

/**
 * 检测 `value` 是否可能是中国人的姓名，支持少数名族姓名中间的 `·` 号。
 *
 * @param value 要检测的值
 * @returns `value` 可能是中国人的姓名返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPossibleChineseName('鲁') // => false
 * isPossibleChineseName('鲁迅') // => true
 * isPossibleChineseName('买买提·吐尔逊') // => true
 * ```
 */
export function isPossibleChineseName(value: string): boolean {
  return (
    !!value
      && value.length > 1
      && value.length < 20
      && value[0] !== '\u00B7'
      && value.indexOf('\u00B7\u00B7') === -1
      && isHan(value.replace(/\u00B7/g, ''))
  )
}

/**
 * 检查 `value` 是否是一个日期。
 *
 * @param value 要检查的值
 * @returns `value` 是日期返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isDate(new Date()) // => true
 * ```
 */
export function isDate(value: any): value is Date {
  return getType(value) === 'Date'
}

/**
 * 检查 `value` 是否是一个邮件地址。
 *
 * @param value 要检查的值
 * @returns `value` 是邮件地址返回 `true`，否则返回 `false`
 * @see http://emailregex.com/
 * @example
 * ```ts
 * isEmail('hello@foo.bar') // => true
 * isEmail('hello@foo') // => false
 * ```
 */
export function isEmail(value: string): boolean {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(value)
}

/**
 * 检查 `value` 是否是空值，包括：`undefined`、`null`、`''`、`false`、`true`、`[]`、`{}`。
 *
 * @param value 要检查的值
 * @returns `value` 是空值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEmpty(undefined) // => true
 * isEmpty(null) // => true
 * isEmpty('') // => true
 * isEmpty(false) // => true
 * isEmpty(true) // => true
 * isEmpty([]) // => true
 * isEmpty({}) // => true
 * ```
 */
export function isEmpty(value: any): boolean {
  return (
    [undefined, null, '', false, true].some(item => item === value)
      || (Array.isArray(value) && value.length === 0)
      || (
        isPlainObject(value) && ii(() => {
          for (const _ in value) {
            return false
          }
          return true
        })
      )
  )
}

/**
 * 检查给定的数组的各项是否相等。
 *
 * @param arrs 要检查的数组
 * @returns 给定的数组的各项都相等返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isEqualArray([1], [1]) // => true
 * isEqualArray([1], [5]) // => false
 * ```
 */
export function isEqualArray(...arrs: any[][]): boolean {
  for (let i = 0; i < arrs.length; i++) {
    if (!Array.isArray(arrs[i])) {
      return false
    }

    if (arrs[i] === arrs[0]) {
      continue
    }

    if (arrs[i].length !== arrs[0].length) {
      return false
    }

    for (let j = 0; j < arrs[i].length; j++) {
      if (arrs[i][j] !== arrs[0][j]) {
        return false
      }
    }
  }

  return true
}

/**
 * 检查 `value` 是否是原始有限数值。
 *
 * @param value 要检查的值
 * @returns `value` 是原始有限数值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFinite(1) // => true
 * isFinite(Infinity) // => false
 * ```
 */
export function isFinite(value: any): value is number {
  return Number.isFinite(value)
}

/**
 * 检查 `value` 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns `value` 是函数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isFunction(() => {}) // => true
 * isFunction(2000) // => false
 * ```
 */
export function isFunction(value: any): value is Function {
  return typeof value === 'function'
}

/**
 * 检查 `value` 是否全是汉字。
 *
 * @param value 要检查的值
 * @returns `value` 全是汉字返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isHan('hello') // => false
 * isHan('嗨咯') // => true
 * ```
 */
export function isHan(value: string): boolean {
  // https://mothereff.in/regexpu#input=const+regex+%3D+%2F%5E%5Cp%7BScript%3DHan%7D%2B%24%2Fu%3B&unicodePropertyEscape=1
  const re = /* /^\p{Script=Han}+$/u */ /^(?:[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FEF\uF900-\uFA6D\uFA70-\uFAD9]|[\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D])+$/
  return re.test(value)
}

/**
 * 检查 `value` 是否是一个整数。
 *
 * @param value 要检查的值
 * @returns `value` 是整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isInteger(1) // => true
 * isInteger(1.2) // => false
 * isInteger(-1) // => true
 * ```
 */
export function isInteger(value: any): value is number {
  return Number.isInteger(value)
}

/**
 * 检查 `value` 是否是一个正整数。
 *
 * @param value 要检查的值
 * @returns `value` 是正整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPositiveInteger(1) // => true
 * isPositiveInteger(-1) // => false
 * ```
 */
export function isPositiveInteger(value: any): value is number {
  return value > 0 && isInteger(value)
}

/**
 * 检查 `value` 是否是一个负整数。
 *
 * @param value 要检查的值
 * @returns `value` 是负整数返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNegativeInteger(-1) // => true
 * isNegativeInteger(1) // => false
 * ```
 */
export function isNegativeInteger(value: any): value is number {
  return value < 0 && isInteger(value)
}

/**
 * 检查 `value` 是否是 `NaN`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `NaN` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNaN(NaN) // => true
 * isNaN(2) // => false
 * ```
 */
export function isNaN(value: any): boolean {
  return value !== value
}

/**
 * 检查 `value` 是否是 `null` 或 `undefined`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `null` 或 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNil(null) // => true
 * isNil(undefined) // => true
 * ```
 */
export function isNil(value: any): value is null | undefined {
  return value == null
}

/**
 * 检查 `value` 是否是 `null`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `null` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNull(null) // => true
 * ```
 */
export function isNull(value: any): value is null {
  return value === null
}

/**
 * 检查 `value` 是否是一个数字。
 *
 * 注：`NaN` 不被认为是数字。
 *
 * @param value 要检查的值
 * @returns `value` 是数字返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNumber(1) // => true
 * isNumber(0.1) // => true
 * isNumber(NaN) // => false
 * ```
 */
export function isNumber(value: any): value is number {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * 检查 `value` 是否是一个数值。
 *
 * 注：`Infinity`、`-Infinity`、`NaN` 不被认为是数值。
 *
 * @param value 要检查的值
 * @returns `value` 是数值返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isNumeric(1) // => true
 * isNumeric('1') // => true
 * ```
 */
export function isNumeric(value: any): value is number | string {
  return value != null && !(getGlobal().isNaN || isNaN)(value - parseFloat(value))
}

/**
 * 检查 `value` 是否是一个对象。
 *
 * @param value 要检查的值
 * @returns `value` 是对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isObject({}) // => true
 * isObject(() => {}) // => true
 * isObject(null) // => false
 * ```
 */
export function isObject(value: any): value is object {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

/**
 * 检查 `value` 是否是一个普通对象。
 *
 * @param value 要检查的值
 * @returns `value` 是普通对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPlainObject({}) // => true
 * isPlainObject(Object.create(null)) // => true
 * isPlainObject(() => {}) // => false
 * ```
 */
export function isPlainObject(value: any): value is Record<keyof any, any> {
  if (!value || typeof value !== 'object') {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  if (proto === null) {
    return true
  }
  const Ctor = proto.constructor
  return typeof Ctor === 'function' && Ctor instanceof Ctor
}

/**
 * 检查 `value` 是否像 `Promise`。
 *
 * @param value 要检查的值
 * @returns `value` 像 `Promise` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isPromiseLike(Promise.resolve()) // => true
 * ```
 */
export function isPromiseLike(value: any): value is PromiseLike<any> {
  return (
    isObject(value)
      && typeof (value as any).then === 'function'
  )
}

/**
 * 检查 `value` 是否是一个正则对象。
 *
 * @param value 要检查的值
 * @returns `value` 是正则对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isRegExp(/hello/) // => true
 * isRegExp(new RegExp('hello')) // => true
 * ```
 */
export function isRegExp(value: any): value is RegExp {
  return getType(value) === 'RegExp'
}

/**
 * 检查 `value` 是否是一个字符串。
 *
 * @param value 要检查的值
 * @returns `value` 是字符串返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isString('') // => true
 * isString('hello') // => true
 * ```
 */
export function isString(value: any): value is string {
  return typeof value === 'string'
}

/**
 * 检查 `value` 是否等于 `undefined`。
 *
 * @param value 要检查的值
 * @returns `value` 是 `undefined` 返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * isUndefined(undefined) // => true
 * isUndefined(void 0) // => true
 * ```
 */
export function isUndefined(value: any): value is undefined {
  return value === undefined
}

/**
 * 检查 `value` 是否是一个有效的网址，仅支持 `http`、`https` 协议，支持 `IP` 域名。
 *
 * @param value 要检查的值
 * @returns `value` 是有效的网址返回 `true`，否则返回 `false`
 * @see http://urlregex.com/
 * @example
 * ```ts
 * isUrl('http://foo.bar') // => true
 * isUrl('https://foo.bar/home') // => true
 * ```
 */
export function isUrl(value: string): boolean {
  // http://urlregex.com/ ==> Ruby
  const re = /^(?:(?:https?):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i
  return re.test(value)
}

/**
 * 检查 `value` 是否是一个 `arguments` 对象。
 *
 * @param value 要检查的值
 * @returns `value` 是 `arguments` 对象返回 `true`，否则返回 `false`
 * @example
 * ```ts
 * function myFunction() {
 *   console.log(isArguments(arguments)) // true
 * }
 * ```
 */
export function isArguments(value: any): value is IArguments {
  return getType(value) === 'Arguments'
}
