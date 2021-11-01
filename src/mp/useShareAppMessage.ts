import { Defined } from '../types'
import { miniProgramBus } from './miniProgramBus'
import { useEffect } from 'react'
import { useLatest } from '../react'

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
