import Taro, {useEffect} from '@tarojs/taro'

/**
 * 动态设置当前页面的标题。
 *
 * @param title 标题
 * @example
 * ```ts
 * // 以产品名称作为页面标题
 * const [product, setProduct] = useState({})
 * useNavigationBarTitle(product.name || '')
 * useEffect(() => {
 *   getProductDetail().then(setProduct)
 * }, [])
 * ```
 */
export function useNavigationBarTitle(title: string) {
  useEffect(() => {
    Taro.setNavigationBarTitle({title})
  }, [title])
}
