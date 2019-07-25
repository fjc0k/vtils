import { isPromiseLike } from './is'

/**
 * 以数组的方式返回异步操作的结果。
 *
 * @param action 要执行的异步操作
 * @returns 返回 `[错误信息, 结果数据]`，错误信息为 `null` 表示没有错误
 * @example
 * ```ts
 * // 异步操作成功
 * const [err, res] = await result(new Promise(resolve => resolve('ok'))) // => [null, 'ok']
 *
 * // 异步操作出错
 * const [err, res] = await result(new Promise((resolve, reject) => reject('err'))) // => ['err']
 * ```
 */
export function result<T extends PromiseLike<any>>(action: T): Promise<[
  any,
  T extends PromiseLike<infer R> ? R : any,
]>

/**
 * 以数组的方式返回函数执行的结果，如果函数返回一个异步操作，将会执行该异步操作并将其结果作为函数执行的结果返回。
 *
 * @param action 要执行的函数
 * @returns 返回 `[错误信息, 结果数据]`，错误信息为 `null` 表示没有错误
 * @example
 * ```ts
 * // 函数执行成功
 * await result(() => 'ok') // => [null, 'ok']
 * await result(() => new Promise(resolve => resolve('ok'))) // => [null, 'ok']
 *
 * // 函数执行出错
 * await result(() => { throw 'err' }) // => ['err']
 * await result(() => new Promise((resolve, reject) => reject('err'))) // => ['err']
 * ```
 */
export function result<T extends () => any, R extends ReturnType<T>>(action: T): Promise<[
  any,
  R extends PromiseLike<any> ? (R extends PromiseLike<infer RR> ? RR : any) : R,
]>

export function result(action: any): Promise<[any, any]> {
  return new Promise(resolve => {
    if (isPromiseLike(action)) {
      return action.then(
        res => resolve([null, res]),
        err => resolve([err] as any),
      )
    }

    try {
      const res = action()
      if (!isPromiseLike(res)) {
        return resolve([null, res])
      }
      return res.then(
        res => resolve([null, res]),
        err => resolve([err] as any),
      )
    } catch (err) {
      return resolve([err] as any)
    }
  })
}
