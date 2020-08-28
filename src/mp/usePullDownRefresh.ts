import { ensureInMiniProgram } from './ensureInMiniProgram'
import { isPromiseLike } from '../utils'
import { miniProgramBus } from './miniProgramBus'
import { useEffect } from 'react'
import { useLatest } from '../react'

export function usePullDownRefresh(callback: () => any): void {
  const latestCallback = useLatest(callback)
  useEffect(() => {
    return miniProgramBus.on('currentPagePullDownRefresh', () => {
      ensureInMiniProgram(mp => {
        const res = latestCallback.current()
        if (isPromiseLike(res)) {
          res.then(() => mp.stopPullDownRefresh())
        } else {
          mp.stopPullDownRefresh()
        }
      })
    })
  }, [])
}
