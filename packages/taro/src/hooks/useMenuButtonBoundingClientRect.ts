import Taro, {useMemo} from '@tarojs/taro'

/**
 * 获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。
 *
 * @example
 * ```ts
 * const rect = useMenuButtonBoundingClientRect()
 * // { width: 333, ... }
 * ```
 */
export function useMenuButtonBoundingClientRect() {
  const rect = useMemo(() => {
    return Taro.getMenuButtonBoundingClientRect()
  }, [])
  return rect
}
