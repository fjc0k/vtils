import { DependencyList, useCallback, useEffect, useRef, useState } from 'react'
import { useLatest } from 'react-use'

/**
 * 加载服务载荷。
 *
 * @public
 */
export interface UseLoadMoreServicePayload {
  /** 已加载的数据量 */
  offset: number
  /** 当前页码 */
  pageNumber: number
}

/**
 * 加载服务结果。
 *
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
 * 加载服务。
 *
 * @public
 */
export interface UseLoadMoreService<TItem> {
  (payload: UseLoadMoreServicePayload): Promise<UseLoadMoreServiceResult<TItem>>
}

/**
 * 加载更多结果。
 *
 * @public
 */
export interface UseLoadMoreResult<TItem> {
  /** 当前页码 */
  pageNumber: number
  /** 已加载的数据 */
  data?: TItem[]
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
  loadMore: () => Promise<void>
  /** 从首页重新加载数据 */
  reload: () => Promise<void>
}

/**
 * 数据加载。
 *
 * @public
 * @param service 数据加载服务
 * @param deps 依赖若发生变化则从首页重新加载数据
 * @returns 返回结果
 */
export function useLoadMore<TItem>(
  service: UseLoadMoreService<TItem>,
  deps: DependencyList,
): UseLoadMoreResult<TItem> {
  const [data, setData] = useState<TItem[]>([])
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [initialLoading, setInitialLoading] = useState(true)
  const [incrementalLoading, setIncrementalLoading] = useState(false)
  const loading = initialLoading || incrementalLoading
  const [noMore, setNoMore] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const firstRef = useRef(true)

  const latest = useLatest({
    service,
    data,
    loading,
    pageNumber,
    noMore,
  })

  const load = useCallback((nextPageNumber: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      const { data, service } = latest.current
      const isFirstPage = nextPageNumber === 1
      setInitialLoading(isFirstPage)
      setIncrementalLoading(!isFirstPage)
      setPageNumber(nextPageNumber)
      service({
        offset: data.length,
        pageNumber: nextPageNumber,
      })
        .then(res => {
          setInitialLoading(false)
          setIncrementalLoading(false)

          if (Array.isArray(res)) {
            setNoMore(res.length === 0)
            setData(isFirstPage ? res : [...data, ...res])
          } else {
            setTotal(res.total)
            setNoMore(
              (isFirstPage ? 0 : data.length) + res.data.length >= res.total,
            )
            setData(isFirstPage ? res.data : [...data, ...res.data])
          }

          resolve()
        })
        .catch(reject)
    })
  }, [])

  const loadMore = useCallback(() => {
    const { noMore, loading, pageNumber } = latest.current
    if (!noMore && !loading) {
      return load(pageNumber + 1)
    }
    return Promise.resolve()
  }, [])

  const reload = useCallback(() => {
    const { loading } = latest.current
    if (firstRef.current || !loading) {
      firstRef.current = false
      return load(1)
    }
    return Promise.resolve()
  }, [])

  useEffect(() => {
    reload()
  }, deps)

  return {
    pageNumber,
    data,
    total,
    loading,
    initialLoading,
    incrementalLoading,
    noMore,
    loadMore,
    reload,
  }
}
