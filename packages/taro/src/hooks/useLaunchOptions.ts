import Taro, {useMemo} from '@tarojs/taro'

/**
 * 获取小程序启动时的参数。
 *
 * @example
 * ```ts
 * const launchOptions = useLaunchOptions()
 * // { path: '启动小程序的路径', ... }
 * ```
 */
export function useLaunchOptions() {
  const launchOptions = useMemo(() => {
    return Taro.getLaunchOptionsSync()
  }, [])
  return launchOptions
}
