import Taro, {useMemo} from '@tarojs/taro'

/**
 * 获取当前帐号信息。
 *
 * @example
 * ```ts
 * const accountInfo = useAccountInfo()
 * // {
 * //   miniProgram: {
 * //     appId: '小程序 appid'
 * //   },
 * //   plugin: {
 * //     appId: '插件 appid',
 * //     version: '插件版本号'
 * //   }
 * // }
 * ```
 */
export function useAccountInfo() {
  const accountInfo = useMemo(() => {
    return Taro.getAccountInfoSync()
  }, [])
  return accountInfo
}
