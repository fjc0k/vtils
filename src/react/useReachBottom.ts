/**
 * Modified from https://github.com/karl-run/react-bottom-scroll-listener/blob/master/src/hook/index.tsx
 */
import { bindEvent, debounce } from '../utils'
import { useEffect, useRef } from 'react'
import { useLatest } from 'react-use'

export function useReachBottom<T extends HTMLElement>(
  callback: () => any,
  offset = 0,
) {
  const containerRef = useRef<T>(null)

  const latestCallback = useLatest(callback)

  useEffect(() => {
    const latestDebouncedCallback = debounce(
      () => latestCallback.current(),
      200,
      { leading: true },
    )
    const unbindEvent = bindEvent(
      (containerRef.current as HTMLElement | null) || window,
    )('scroll', function () {
      if (this === window) {
        const scrollNode = document.scrollingElement || document.documentElement
        const scrollContainerBottomPosition = Math.round(
          scrollNode.scrollTop + window.innerHeight,
        )
        const scrollPosition = Math.round(scrollNode.scrollHeight - offset)
        if (scrollPosition <= scrollContainerBottomPosition) {
          latestDebouncedCallback()
        }
      } else {
        const scrollNode = containerRef.current!
        const scrollContainerBottomPosition = Math.round(
          scrollNode.scrollTop + scrollNode.clientHeight,
        )
        const scrollPosition = Math.round(scrollNode.scrollHeight - offset)
        if (scrollPosition <= scrollContainerBottomPosition) {
          latestDebouncedCallback()
        }
      }
    })
    return () => {
      unbindEvent()
      latestDebouncedCallback.cancel()
    }
  }, [offset])

  return containerRef
}
