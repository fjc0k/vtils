import isFunction from './isFunction'

export type ArgumentsType<T> = T extends (...args: infer U) => any ? U: never

function result<T extends (...args: any[]) => any>(value: T, ...args: ArgumentsType<T>): ReturnType<T>

function result<T>(value: T): T

/**
 * 如果 `value` 是函数，返回函数执行后的值；否则，直接返回 `value`。
 *
 * @param value 要解析的值
 * @param args 如果 `value` 是函数，传递给它的参数
 * @returns 解析后的值
 */
function result(value: any, ...args: any[]): any {
  return isFunction(value) ? value.apply(null, args) : value
}

export default result
