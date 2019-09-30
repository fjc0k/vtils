import {DependencyList, useReachBottom} from '@tarojs/taro'
import {useLoadMore, UseLoadMoreReturn, UseLoadMoreService} from '@vtils/react'

/**
 * 滚动数据加载。
 *
 * @param service 数据加载服务
 * @param deps 依赖，依赖若更新则执行一次数据加载服务
 * @returns 返回结果
 */
export function useScrollLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
): UseLoadMoreReturn<TItem> {
  const loader = useLoadMore(service, deps)
  useReachBottom(loader.loadMore)

  return loader
}
