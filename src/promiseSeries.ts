/**
 * 顺序执行异步任务。
 *
 * @param tasks 要执行的任务列表
 * @returns 返回全部任务执行结果组成的数组
 */
export function promiseSeries<
  // eslint-disable-next-line space-before-function-paren
  T extends (...args: any) => Promise<any>,
  R extends (T extends (...args: any) => Promise<infer X> ? X : any),
>(tasks: T[]) {
  return tasks.reduce<Promise<R[]>>(
    (promise, task) => promise.then(
      resultList => task().then(
        result => resultList.concat(result),
      ),
    ),
    Promise.resolve([]),
  )
}
