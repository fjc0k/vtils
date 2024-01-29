import { useEffect } from 'react'
import { useLatest } from '../react/index.ts'
import { isPromiseLike } from '../utils/index.ts'
import { ensureInMiniProgram } from './ensureInMiniProgram.ts'
import { miniProgramBus } from './miniProgramBus.ts'

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
