/**
 * 任意函数。
 *
 * @public
 */
export type AnyFunction = Record<any, any> & {
  (...args: any[]): any
}
