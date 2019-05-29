import { AnyFunction } from './enhanceType'
import { isPromiseLike } from './is'

/**
 * 并行执行任务，`同步任务`、`异步任务` 皆可。
 *
 * @param tasks 要执行的任务列表
 * @returns 返回全部任务执行结果组成的数组
 */
export function parallel<
  T extends AnyFunction,
  // eslint-disable-next-line
  R extends (
    T extends (...args: any) => Promise<infer X>
      ? X
      : T extends (...args: any) => infer Y
        ? Y
        : any
  ),
>(tasks: T[]) { // eslint-disable-line
  return Promise.all<R>(
    tasks.map(task => {
      return new Promise((resolve, reject) => {
        const result = task()
        if (isPromiseLike(result)) {
          return result.then(resolve, reject)
        }
        return resolve(result)
      })
    }),
  )
}
