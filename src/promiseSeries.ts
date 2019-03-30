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
