import {getCurrentPageUrl} from '../getCurrentPageUrl'
import {useEffect, useState} from '@tarojs/taro'

/**
 * 获取当前页面的绝对路径，包含查询参数。
 *
 * @example
 * ```ts
 * const currentPageUrl = useCurrentPageUrl()
 *
 * if (currentPageUrl) {
 *   // => /pages/Product/Detail?id=10
 * }
 * ```
 */
export function useCurrentPageUrl(): string | null {
  const [currentPageUrl, setCurrentPageUrl] = useState<string | null>(null)

  useEffect(() => {
    setCurrentPageUrl(getCurrentPageUrl())
  }, [])

  return currentPageUrl
}
