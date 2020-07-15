/**
 * 任意异步函数。
 *
 * @public
 */
export type AnyAsyncFunction = Record<any, any> & {
  (...args: any[]): Promise<any>
}
