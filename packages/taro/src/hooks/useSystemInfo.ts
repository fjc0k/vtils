import Taro, {useMemo} from '@tarojs/taro'

/**
 * 获取系统信息。
 *
 * @example
 * ```ts
 * const systemInfo = useSystemInfo()
 * // { screenWidth: 750, ... }
 * ```
 */
export function useSystemInfo() {
  const systemInfo = useMemo(() => {
    return Taro.getSystemInfoSync()
  }, [])
  return systemInfo
}
