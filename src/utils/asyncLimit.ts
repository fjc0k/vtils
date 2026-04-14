export interface AsyncLimitOptions<T extends (...args: any[]) => Promise<any>> {
  /**
   * 并行量。
   *
   * @default 1
   */
  concurrency?: number

  /**
   * 按参数分组，分组之间并行执行，组内按顺序执行。
   *
   * @default 不分组
   */
  groupBy?: (...args: Parameters<T>) => string
}

interface QueueItem {
  args: any[]
  resolve: (res: any) => void
}

interface GroupState {
  queue: QueueItem[]
  activeCount: number
}

const defaultGroupKey = '__DEFAULT__'

/**
 * 异步函数并行执行限制。
 *
 * @param asyncFn 异步函数
 * @param options 选项
 */
export function asyncLimit<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options: AsyncLimitOptions<T> = {},
): T {
  const { concurrency = 1, groupBy } = options

  const groups = new Map<string, GroupState>()

  const getGroupState = (groupKey: string) => {
    let groupState = groups.get(groupKey)
    if (!groupState) {
      groupState = { queue: [], activeCount: 0 }
      groups.set(groupKey, groupState)
    }
    return groupState
  }

  const call = (...args: any[]) => {
    return new Promise(resolve => {
      const groupKey = groupBy
        ? groupBy(...(args as Parameters<T>))
        : defaultGroupKey
      const groupState = getGroupState(groupKey)
      groupState.queue.push({ args, resolve })
      run(groupKey)
    })
  }

  const run = (groupKey: string) => {
    const groupState = groups.get(groupKey)
    if (!groupState) {
      return
    }

    if (groupState.activeCount < concurrency && groupState.queue.length) {
      groupState.activeCount++
      const { args, resolve } = groupState.queue.shift()!
      const res = asyncFn(...args)
      resolve(res)
      res.then(
        () => next(groupKey),
        () => next(groupKey),
      )
    }
  }

  const next = (groupKey: string) => {
    const groupState = groups.get(groupKey)
    if (!groupState) {
      return
    }

    groupState.activeCount--
    run(groupKey)

    if (!groupState.activeCount && !groupState.queue.length) {
      groups.delete(groupKey)
    }
  }

  return call as any
}
