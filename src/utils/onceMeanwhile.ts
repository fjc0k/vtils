import { AnyAsyncFunction } from '../types/index.ts'
import { isPromiseLike } from './isPromiseLike.ts'

/**
 * 同一时间对函数的调用只会触发一次运行。
 *
 * @param fn 函数
 * @returns 返回函数调用结果
 */
export function onceMeanwhile<TFunc extends AnyAsyncFunction>(
  fn: TFunc,
): TFunc {
  let running = false
  let result: Promise<any>
  const proxy = (...args: any[]) => {
    if (!running) {
      running = true
      const res = fn(...args)
      if (isPromiseLike(res)) {
        result = res.then(_ => {
          running = false
          return _
        })
      }
    }
    return result
  }
  return proxy as any
}
