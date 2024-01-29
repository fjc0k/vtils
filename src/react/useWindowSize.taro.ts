import {
  getSystemInfoSync,
  offWindowResize,
  onWindowResize,
} from '@tarojs/taro'
import { useEffect, useState } from 'react'
import { useWindowSize as _useWindowSize } from './useWindowSize.ts'

const getWindowSize = function (): ReturnType<typeof _useWindowSize> {
  const { windowWidth: width, windowHeight: height } = getSystemInfoSync()
  return { width, height }
}

export const useWindowSize: typeof _useWindowSize = function (
  // 不支持
  _initialWidth,
  // 不支持
  _initialHeight,
) {
  const [size, setSize] = useState(getWindowSize)
  useEffect(() => {
    const getWindowSizeCallback = () => {
      setSize(getWindowSize())
    }
    onWindowResize?.(getWindowSizeCallback)
    return () => {
      offWindowResize?.(getWindowSizeCallback)
    }
  }, [])
  return size
}
