export interface AsyncLimitOptions<T extends (...args: any[]) => Promise<any>> {
  /**
   * 并行量。
   *
   * @default 1
   */
  concurrency?: number

  /**
   * 每秒最大调用次数，按 1 秒滑动窗口计算。
   *
   * 和 `concurrency` 二选一传入。
   */
  qps?: number

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
  /** 最近 1 秒内的启动时间戳，仅 qps 模式使用。 */
  startTimes: number[]
  /** 等待限流窗口放行时的定时器，仅 qps 模式使用。 */
  timer: any | null
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
  if (options.concurrency != null && options.qps != null) {
    throw new TypeError('只能同时传入 concurrency 和 qps 其中一个')
  }

  const { concurrency = 1, qps, groupBy } = options
  const limit = qps != null ? Infinity : concurrency

  const groups = new Map<string, GroupState>()

  const getGroupState = (groupKey: string) => {
    let groupState = groups.get(groupKey)
    if (!groupState) {
      groupState = { queue: [], activeCount: 0, startTimes: [], timer: null }
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

    if (!groupState.queue.length) {
      return
    }

    if (qps != null) {
      const now = Date.now()
      while (
        groupState.startTimes.length &&
        now - groupState.startTimes[0] >= 1000
      ) {
        groupState.startTimes.shift()
      }

      if (groupState.startTimes.length >= qps) {
        if (!groupState.timer) {
          const delay = 1000 - (now - groupState.startTimes[0]) + 1
          groupState.timer = setTimeout(() => {
            groupState.timer = null
            run(groupKey)
          }, delay)
        }
        return
      }
      groupState.startTimes.push(now)
    }

    if (groupState.activeCount < limit) {
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
      if (groupState.timer) {
        clearTimeout(groupState.timer)
        groupState.timer = null
      }
      groups.delete(groupKey)
    }
  }

  return call as any
}
