import {DependencyList, useReachBottom} from '@tarojs/taro'
import {useLoadMore, UseLoadMoreReturn, UseLoadMoreService} from '@vtils/react'

/**
 * 滚动数据加载。
 *
 * @param service 数据加载服务
 * @param deps 依赖，依赖若发生变化则从首页重新加载数据
 * @returns 返回结果
 * @example
 * ```ts
 * const [catId, setCatId] = useState(1)
 *
 * const loader = useScrollLoadMore(
 *   // 在这里加载数据
 *   payload => {
 *     return getListByCatId({
 *       id: catId,
 *       pageNumber: payload.pageNumber
 *     }).then(res => {
 *       // 返回的数据结构必须为一个对象或数组，对象的结构如下，
 *       // 若返回数组，当数组为空时即视为加载完成
 *       return {
 *         data: res.data,
 *         total: res.total
 *       }
 *     })
 *   },
 *   // 依赖若发生变化则从首页重新加载数据
 *   [catId]
 * )
 *
 * const handleCatChange = useCallback((catId: number) => {
 *   setCatId(catId)
 * }, [])
 *
 * console.log(loader.loading) // 是否正在加载中
 * console.log(loader.initialLoading) // 是否初次加载中，重新加载也视为初次加载
 * console.log(loader.incrementalLoading) // 是否增量加载中
 * console.log(loader.noMore) // 数据是否已加载完成
 * console.log(loader.pageNumber) // 已经加载到多少页
 * console.log(loader.total) // 数据总量
 * ```
 */
export function useScrollLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
): UseLoadMoreReturn<TItem> {
  const loader = useLoadMore(service, deps)
  useReachBottom(loader.loadMore)

  return loader
}
