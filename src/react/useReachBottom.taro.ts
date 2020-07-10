import { useReachBottom as _useReachBottom } from './useReachBottom'
import { useEffect, useRef } from 'react'
import { useReachBottom as useTaroReachBottom } from '@tarojs/taro'

export const useReachBottom: typeof _useReachBottom = (
  callback,
  // 小程序下该项在页面配置中的 onReachBottomDistance 设置
  _offset,
) => {
  const ref = useRef<any>()

  // 立即触发一次回调
  useEffect(() => {
    callback()
  }, [])

  useTaroReachBottom(callback)

  // 小程序下始终相对于窗口，ref 无实际作用，仅起兼容作用
  return ref
}
