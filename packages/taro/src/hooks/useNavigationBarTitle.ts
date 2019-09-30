import Taro, {useEffect} from '@tarojs/taro'

/**
 * 动态设置当前页面的标题。
 *
 * @param title 标题
 */
export function useNavigationBarTitle(title: string) {
  useEffect(() => {
    Taro.setNavigationBarTitle({title})
  }, [title])
}
