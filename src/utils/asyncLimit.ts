export interface AsyncLimitOptions {
  /**
   * 并行量。
   *
   * @default 1
   */
  concurrency?: number
}

/**
 * 异步函数并行执行限制。
 *
 * @param asyncFn 异步函数
 * @param options 选项
 */
export function asyncLimit<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options: AsyncLimitOptions = {},
): T {
  const { concurrency = 1 } = options
  const queue: Array<[args: any[], resolve: (res: any) => any]> = []
  let activeCount = 0

  const call = (...args: any[]) => {
    return new Promise(resolve => {
      queue.push([args, resolve])
      run()
    })
  }

  const run = () => {
    if (activeCount < concurrency && queue.length) {
      activeCount++
      const [args, resolve] = queue.shift()!
      const res = asyncFn(...args)
      resolve(res)
      res.then(next, next)
    }
  }

  const next = () => {
    activeCount--
    run()
  }

  return call as any
}
