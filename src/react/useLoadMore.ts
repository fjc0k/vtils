import { DependencyList, useCallback, useEffect, useState } from 'react'

/**
 * @public
 */
export interface UseLoadMoreServicePayload {
  /** 已加载的数据量 */
  offset: number
  /** 当前页码 */
  pageNumber: number
}

/**
 * @public
 */
export type UseLoadMoreServiceResult<TItem> =
  | TItem[]
  | {
      /** 总数据量 */
      total: number
      /** 当前页数据 */
      data: TItem[]
    }

/**
 * @public
 */
export interface UseLoadMoreService<TItem> {
  (payload: UseLoadMoreServicePayload): Promise<UseLoadMoreServiceResult<TItem>>
}

/**
 * @public
 */
export interface UseLoadMoreResult<TItem> {
  /** 当前页码 */
  pageNumber: number
  /** 已加载的数据 */
  data: TItem[]
  /** 总数据量 */
  total: number
  /** 是否正在加载数据 */
  loading: boolean
  /** 是否正在加载初始数据 */
  initialLoading: boolean
  /** 是否正在加载更多数据 */
  incrementalLoading: boolean
  /** 数据是否已加载完 */
  noMore: boolean
  /** 加载更多数据 */
  loadMore: () => void
  /** 从首页重新加载数据 */
  reload: () => void
}

/**
 * 数据加载。
 *
 * @public
 * @param service 数据加载服务
 * @param deps 依赖，依赖若发生变化则从首页重新加载数据
 * @returns 返回结果
 */
export function useLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
): UseLoadMoreResult<TItem> {
  const [data, setData] = useState<TItem[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loadingState, setLoadingState] = useState(() => ({
    loading: true,
    initialLoading: true,
    incrementalLoading: true,
  }))
  const [noMore, setNoMore] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)

  const load = useCallback(
    (nextPageNumber: number) => {
      setPageNumber(nextPageNumber)
      const isFirstPage = nextPageNumber === 1
      setLoadingState({
        loading: true,
        initialLoading: isFirstPage,
        incrementalLoading: !isFirstPage,
      })
      service({
        offset: data.length,
        pageNumber: nextPageNumber,
      }).then(res => {
        setLoadingState({
          loading: false,
          initialLoading: false,
          incrementalLoading: false,
        })

        if (Array.isArray(res)) {
          setNoMore(res.length === 0)
          setData(data => (isFirstPage ? res : [...data, ...res]))
        } else {
          setTotal(res.total)
          setData(data => {
            setNoMore(
              (isFirstPage ? res.data.length : data.length + res.data.length) >=
                res.total,
            )
            return isFirstPage ? res.data : [...data, ...res.data]
          })
        }
      })
    },
    [data, ...deps],
  )

  const loadMore = useCallback(() => {
    if (!noMore && !loadingState.loading) {
      load(pageNumber + 1)
    }
  }, [pageNumber, loadingState.loading, noMore, load])

  const reload = useCallback(() => {
    load(1)
  }, [load])

  useEffect(() => {
    reload()
  }, deps)

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
