import Taro, {useEffect} from '@tarojs/taro'

/**
 * 控制导航条加载动画的显示、隐藏。
 *
 * @param visible 是否显示导航条加载动画
 * @example
 * ```ts
 * // 加载列表数据时显示导航条加载动画
 * const [loading, setLoading] = useState(true)
 * useNavigationBarLoading(loading)
 * useEffect(() => {
 *   setLoading(true)
 *   getListApi().then(() => {
 *     setLoading(false)
 *   })
 * }, [])
 * ```
 */
export function useNavigationBarLoading(visible: boolean) {
  useEffect(() => {
    if (visible) {
      Taro.showNavigationBarLoading()
    } else {
      Taro.hideNavigationBarLoading()
    }
  }, [visible])
}
