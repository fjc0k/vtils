import {DependencyList, useCallback, useEffect, useState} from 'react'

export interface UseLoadMoreServicePayload {
  /** 已加载的数据量 */
  offset: number,
  /** 当前页码 */
  pageNumber: number,
}

export type UseLoadMoreServiceReturn<TItem> = TItem[] | {
  /** 总数据量 */
  total: number,
  /** 当前页数据 */
  data: TItem[],
}

export interface UseLoadMoreService<TItem> {
  (payload: UseLoadMoreServicePayload): Promise<UseLoadMoreServiceReturn<TItem>>,
}

export interface UseLoadMoreReturn<TItem> {
  /** 当前页码 */
  pageNumber: number,
  /** 已加载的数据 */
  data: TItem[],
  /** 总数据量 */
  total: number,
  /** 是否正在加载数据 */
  loading: boolean,
  /** 是否正在加载初始数据 */
  initialLoading: boolean,
  /** 是否正在加载更多数据 */
  incrementalLoading: boolean,
  /** 数据是否已加载完 */
  noMore: boolean,
  /** 加载更多数据 */
  loadMore: () => void,
  /** 从首页重新加载数据 */
  reload: () => void,
}

/**
 * 数据加载。
 *
 * @param service 数据加载服务
 * @param deps 依赖，依赖若更新则执行一次数据加载服务
 * @returns 返回结果
 */
export function useLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
): UseLoadMoreReturn<TItem> {
  const [data, setData] = useState<TItem[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loadingState, setLoadingState] = useState(() => ({
    loading: true,
    initialLoading: true,
    incrementalLoading: true,
  }))
  const [noMore, setNoMore] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const load = useCallback(() => {
    const isFirstPage = pageNumber === 1
    setLoadingState({
      loading: true,
      initialLoading: isFirstPage,
      incrementalLoading: !isFirstPage,
    })
    service({offset: data.length, pageNumber}).then(res => {
      setLoadingState({
        loading: false,
        initialLoading: false,
        incrementalLoading: false,
      })

      if (Array.isArray(res)) {
        setNoMore(res.length === 0)
        setData(data => isFirstPage ? res : [...data, ...res])
      } else {
        setTotal(res.total)
        setData(data => {
          setNoMore(
            (
              isFirstPage
                ? res.data.length
                : data.length + res.data.length
            ) >= res.total,
          )
          return isFirstPage ? res.data : [...data, ...res.data]
        })
      }
    })
  }, [pageNumber, data, ...deps])

  const loadMore = useCallback(() => {
    if (!noMore && !loadingState.loading) {
      setPageNumber(pageNumber => pageNumber + 1)
    }
  }, [loadingState.loading, noMore])

  const reload = useCallback(() => {
    setPageNumber(1)
  }, [])

  useEffect(() => {
    load()
  }, [pageNumber, ...deps])

  return {
    pageNumber: pageNumber,
    data: data,
    total: total,
    loading: loadingState.loading,
    initialLoading: loadingState.initialLoading,
    incrementalLoading: loadingState.incrementalLoading,
    noMore: noMore,
    loadMore: loadMore,
    reload: reload,
  }
}
