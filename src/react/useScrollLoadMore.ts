import { DependencyList, useEffect } from 'react'
import {
  UseLoadMoreResult,
  UseLoadMoreService,
  useLoadMore,
} from './useLoadMore.ts'
import { useReachBottom } from './useReachBottom.ts'

/**
 * @public
 */
export interface UseScrollLoadMoreOptions {
  /**
   * 距离底部偏移量（单位：像素），小于该值时触发加载。
   *
   * @default 0
   */
  offset?: number

  /**
   * 滚动容器，默认以窗口作为滚动容器。
   *
   * @default window
   */
  containerRef?: ReturnType<typeof useReachBottom>
}

/**
 * 滚动数据加载。
 *
 * @public
 * @param service 数据加载服务
 * @param deps 依赖，依赖若发生变化则从首页重新加载数据
 * @param options 滚动选项
 * @returns 返回结果
 */
export function useScrollLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
  options: UseScrollLoadMoreOptions = {},
): UseLoadMoreResult<TItem> {
  const loader = useLoadMore(service, deps)
  const containerRef = useReachBottom(loader.loadMore, options.offset || 0)

  useEffect(() => {
    if (options.containerRef && options.containerRef.current) {
      ;(containerRef as any).current = options.containerRef.current
    }
  }, [options.containerRef && options.containerRef.current])

  return loader
}
