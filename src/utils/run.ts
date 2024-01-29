import { isPromiseLike } from './isPromiseLike.ts'

/**
 * 以数组的方式返回函数执行的结果，如果函数返回一个异步操作，将会执行该异步操作并将其结果作为函数执行的结果返回。
 *
 * @param fn 要执行的函数
 * @returns 返回 `[错误信息, 结果数据]`，错误信息为 `null` 表示没有错误
 * @example
 * ```typescript
 * // 函数执行成功
 * const [err, res] = await run(() => 'ok') // => [null, 'ok']
 * const [err, res] = await run(async () => 'ok') // => [null, 'ok']
 *
 * // 函数执行出错
 * const [err, res] = await run(() => { throw 'err' }) // => ['err']
 * const [err, res] = await run(async () => { throw 'err' }) // => ['err']
 * ```
 */
export function run<T extends () => any, R extends ReturnType<T>>(
  fn: T,
): Promise<
  [
    unknown,
    R extends PromiseLike<any>
      ? R extends PromiseLike<infer X>
        ? X
        : unknown
      : R,
  ]
> {
  return new Promise(resolve => {
    try {
      const res = fn()
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
