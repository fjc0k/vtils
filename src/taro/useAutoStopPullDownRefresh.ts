import { isPromiseLike } from '../utils'
import { stopPullDownRefresh, usePullDownRefresh } from '@tarojs/taro'

/**
 * 同 `Taro.usePullDownRefresh`，不过在回调函数完成后会自动调用 `Taro.stopPullDownRefresh()`。
 *
 * @param callback 回调函数
 */
export function useAutoStopPullDownRefresh(callback: () => any) {
  usePullDownRefresh(() => {
    const res = callback()
    if (isPromiseLike(res)) {
      res.then(() => stopPullDownRefresh())
    } else {
      stopPullDownRefresh()
    }
  })
}
