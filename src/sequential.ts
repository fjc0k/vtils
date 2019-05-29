import { isPromiseLike } from './is'

/**
 * 顺序执行任务，`同步任务`、`异步任务` 皆可。
 *
 * @param tasks 要执行的任务列表
 * @returns 返回全部任务执行结果组成的数组
 */
export function sequential<
  // eslint-disable-next-line
  T extends (resultList: any[]) => any,
  // eslint-disable-next-line
  R extends (
    T extends (...args: any) => Promise<infer X>
      ? X
      : T extends (...args: any) => infer Y
        ? Y
        : any
  ),
>(tasks: T[]) { // eslint-disable-line
  return new Promise((resolve, reject) => {
    let rejected = false
    tasks
      .reduce<Promise<R[]>>(
        (promise, task) => {
          return promise.then(
            resultList => {
              if (rejected) {
                return resultList
              }
              const result = task(resultList)
              if (isPromiseLike(result)) {
                return result.then(
                  result => resultList.concat(result),
                  reason => {
                    rejected = true
                    return resultList.concat(reason)
                  },
                )
              }
              return resultList.concat(result)
            },
          )
        },
        Promise.resolve([]),
      )
      .then(resultList => {
        if (rejected) {
          reject(resultList.pop())
        } else {
          resolve(resultList)
        }
      })
  })
}
