import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatest } from 'react-use'

export type UseIntervalResult<TResult> = [
  TResult | undefined,
  {
    start: () => void
    stop: () => void
  },
]

/**
 * 以一定的间隔时间重复调用某函数，并返回调用结果。
 *
 * @param callback 回调函数
 * @param delay 间隔时间（毫秒），非数字时将不调用或停止调用函数
 * @returns 返回调用结果
 */
export function useInterval<TResult>(
  callback: () => TResult,
  delay: any,
): UseIntervalResult<TResult> {
  const [result, setResult] = useState<TResult>()
  const latestCallback = useLatest(callback)
  const latestDelay = useLatest(delay)
  const interval = useRef<any>()

  const stop = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [])

  const start = useCallback(() => {
    stop()
    if (typeof latestDelay.current === 'number') {
      setResult(latestCallback.current())
      interval.current = setInterval(() => {
        setResult(latestCallback.current())
      }, latestDelay.current)
    }
  }, [])

  useEffect(() => {
    start()
    return stop
  }, [delay])

  return [result, { start, stop }]
}
