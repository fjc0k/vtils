import { useCallback, useRef, useState } from 'react'
import { useLatest, useUnmount } from 'react-use'

export interface UseHoverOptions {
  /**
   * 悬停开始后多久开启悬停态，单位为毫秒。
   *
   * @default 50
   */
  hoverStartDelay?: number

  /**
   * 悬停结束后多久关闭悬停态，单位为毫秒。
   *
   * @default 400
   */
  hoverEndDelay?: number
}

export interface UseHoverResult {
  /**
   * 当前的悬停态。
   */
  hovering: boolean

  /**
   * 开始悬停。
   */
  startHover: () => any

  /**
   * 结束悬停。
   */
  endHover: () => any
}

export function useHover(options: UseHoverOptions = {}): UseHoverResult {
  const { hoverStartDelay = 50, hoverEndDelay = 400 } = options

  const [hovering, setHovering] = useState(false)

  const latestHoverStartDelay = useLatest(hoverStartDelay)
  const latestHoverEndDelay = useLatest(hoverEndDelay)
  const latestHovering = useLatest(hovering)

  const hoverStartTimer = useRef<any>()
  const hoverEndTimer = useRef<any>()

  const clearHoverStartTimer = useCallback(() => {
    if (hoverStartTimer.current) {
      clearTimeout(hoverStartTimer.current)
      hoverStartTimer.current = undefined
    }
  }, [])
  const clearHoverEndTimer = useCallback(() => {
    if (hoverEndTimer.current) {
      clearTimeout(hoverEndTimer.current)
      hoverEndTimer.current = undefined
    }
  }, [])

  const startHover = useCallback(() => {
    if (!latestHovering.current) {
      clearHoverStartTimer()
      hoverStartTimer.current = setTimeout(() => {
        setHovering(true)
      }, latestHoverStartDelay.current)
    }
  }, [])
  const endHover = useCallback(() => {
    if (latestHovering.current) {
      clearHoverEndTimer()
      hoverEndTimer.current = setTimeout(() => {
        setHovering(false)
      }, latestHoverEndDelay.current)
    } else {
      clearHoverStartTimer()
    }
  }, [])

  useUnmount(() => {
    clearHoverStartTimer()
    clearHoverEndTimer()
  })

  return {
    hovering,
    startHover,
    endHover,
  }
}
