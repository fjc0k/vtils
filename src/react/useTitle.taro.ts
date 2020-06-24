import { useTitle as _useTitle } from 'react-use'
import { setNavigationBarTitle } from '@tarojs/taro'
import { useEffect } from 'react'

export const useTitle: typeof _useTitle = (
  title,
  // 小程序下获取不到当前页面标题，因此 options.restoreOnUnmount 无效
  _options,
) => {
  useEffect(() => {
    setNavigationBarTitle({ title })
  }, [title])
}
