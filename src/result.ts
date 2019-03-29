import { isFunction } from './isFunction'

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U: never

/**
 * 如果 `value` 是函数，返回函数执行后的值。
 *
 * @param value 要解析的值
 * @param args 传递给函数的参数
 * @returns 解析后的值
 */
function result<T extends (...args: any[]) => any>(value: T, ...args: ArgumentsType<T>): ReturnType<T>

/**
 * 如果 `value` 不是函数，直接返回 `value`。
 *
 * @param value 要解析的值
 * @returns 解析后的值
 */
function result<T>(value: T): T

function result(value: any, ...args: any[]): any {
  return isFunction(value) ? value.apply(null, args) : value
}

export { result }
