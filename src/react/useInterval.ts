import { useCallback, useEffect, useRef, useState } from 'react'
import { useLatest } from 'react-use'

export type UseIntervalResult<TResult> = [
  TResult,
  {
    start: () => void
    stop: () => void
  },
]

export function useInterval<TResult>(
  callback: () => TResult,
  delay: number,
): UseIntervalResult<TResult> {
  const [result, setResult] = useState<TResult>(callback)
  const latestCallback = useLatest(callback)
  const latestDelay = useLatest(delay)
  const interval = useRef<any>()
  const isFirst = useRef<boolean>(true)

  const stop = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [])

  const start = useCallback(() => {
    stop()
    if (!isFirst.current) {
      setResult(latestCallback.current())
    }
    interval.current = setInterval(() => {
      setResult(latestCallback.current())
    }, latestDelay.current)
  }, [])

  useEffect(() => {
    start()
    return stop
  }, [delay])

  useEffect(() => {
    isFirst.current = false
    return () => {
      isFirst.current = true
    }
  }, [])

  return [result, { start, stop }]
}
