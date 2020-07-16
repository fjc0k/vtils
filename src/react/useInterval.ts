import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatest } from 'react-use'

export type UseIntervalResult<TResult> = [
  TResult | undefined,
  {
    start: (delay?: number, duration?: number) => void
    stop: () => void
  },
]

/**
 * 以一定的间隔时间重复调用某函数，并返回调用结果。
 *
 * @param callback 回调函数
 * @param delay 间隔时间（毫秒），非数字时将不调用或停止调用函数
 * @param duration 持续时间（毫秒）
 * @returns 返回调用结果
 */
export function useInterval<TResult>(
  callback: () => TResult,
  delay: any,
  duration?: number,
): UseIntervalResult<TResult> {
  const [result, setResult] = useState<TResult>()
  const latestCallback = useLatest(callback)
  const latestDelay = useLatest(delay)
  const latestDuration = useLatest(duration)
  const interval = useRef<any>()

  const stop = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [])

  const start = useCallback((delay?: number, duration?: number) => {
    stop()
    delay = delay ?? latestDelay.current
    duration = duration ?? latestDuration.current
    if (typeof delay === 'number') {
      setResult(latestCallback.current())
      interval.current = setInterval(() => {
        setResult(latestCallback.current())
      }, delay)
    }
    if (typeof duration === 'number') {
      setTimeout(() => {
        stop()
      }, duration)
    }
  }, [])

  useEffect(() => {
    start()
    return stop
  }, [delay])

  return [result, { start, stop }]
}
