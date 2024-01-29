import { useEffect } from 'react'
import { useLatest } from '../react/index.ts'
import { Defined } from '../types/index.ts'
import { miniProgramBus } from './miniProgramBus.ts'

export function useShareAppMessage(
  callback: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onShareAppMessage']
  >,
): void {
  const latestCallback = useLatest(callback)
  useEffect(() => {
    return miniProgramBus.on('currentPageShareAppMessage', (...args) => {
      return latestCallback.current(...args)
    })
  }, [])
}
