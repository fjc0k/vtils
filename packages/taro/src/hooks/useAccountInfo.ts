import Taro, {useMemo} from '@tarojs/taro'

/**
 * 获取当前帐号信息。
 */
export function useAccountInfo() {
  const accountInfo = useMemo(() => {
    return Taro.getAccountInfoSync()
  }, [])
  return accountInfo
}
