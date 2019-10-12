import Taro, {useEffect} from '@tarojs/taro'

/**
 * 使用加载提示。
 *
 * @param visible 是否显示加载提示
 * @param message 提示内容，默认为：`加载中...`
 * @example
 * ```ts
 * const getDetail = useAsync(async () => {
 *   return getDetailApi()
 * })
 * useLoading(getDetail.loading, '获取数据中...')
 * ```
 */
export function useLoading(visible: boolean, message: string = '加载中...') {
  useEffect(() => {
    if (visible) {
      Taro.showLoading({
        title: message,
      })
    } else {
      Taro.hideLoading()
    }
  }, [visible])
}
