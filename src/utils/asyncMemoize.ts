export interface AsyncMemoizeOptions<
  T extends (...args: any[]) => Promise<any>,
> {
  /**
   * 缓存键。
   *
   * @default arg0 => arg0
   */
  cacheKey?: (...args: Parameters<T>) => any

  /**
   * 缓存时效（毫秒）。
   *
   * - `0` 表示永久缓存，直到手动清除或发生错误。
   * - `while-pending` 或 `-1` 表示仅在异步操作未完成前缓存，完成后失效。
   * - `数字` 表示具体的缓存时长（毫秒）。
   * - `函数形式` 可根据结果和参数动态设置时效。
   *
   * @default 0
   */
  cacheTTL?:
    | 'while-pending'
    | number
    | ((
        result: Awaited<ReturnType<T>>,
        ...args: Parameters<T>
      ) => number | void)
}

export type AsyncMemoizeCacheMap = Map<
  string,
  {
    value: any
    expiredAt: number
  }
>

/**
 * 异步函数执行缓存。
 *
 * @param asyncFn 异步函数
 * @param options 选项
 */
export function asyncMemoize<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options: AsyncMemoizeOptions<T> = {},
): T & {
  cache: AsyncMemoizeCacheMap
} {
  const { cacheKey = (...args: any[]) => args[0], cacheTTL } = options
  const cache: AsyncMemoizeCacheMap = new Map()

  const call = (...args: any[]) => {
    const _cacheKey = cacheKey(...args)
    const cacheValue = cache.get(_cacheKey)
    const currentMs = Date.now()
    if (
      cacheValue &&
      (cacheValue.expiredAt === 0 || currentMs < cacheValue.expiredAt)
    ) {
      return cacheValue.value
    }
    const cacheValueNew = asyncFn(...args)
    cacheValueNew.catch(() => cache.delete(_cacheKey))
    const cacheTTLIsFunction = typeof cacheTTL === 'function'
    const cacheTTLIsWhilePending =
      cacheTTL === 'while-pending' || cacheTTL === -1
    cache.set(_cacheKey, {
      value: cacheValueNew,
      expiredAt: cacheTTLIsFunction
        ? 0
        : !cacheTTL || cacheTTLIsWhilePending
        ? 0
        : currentMs + cacheTTL,
    })
    if (cacheTTLIsWhilePending) {
      cacheValueNew.then(() => {
        cache.delete(_cacheKey)
      })
    }
    if (cacheTTLIsFunction) {
      cacheValueNew.then(result => {
        const ttl = cacheTTL(result, ...(args as any))
        const expiredAt = ttl ? Date.now() + ttl : 0
        const cached = cache.get(_cacheKey)
        if (cached) {
          cached.expiredAt = expiredAt
        }
      })
    }
    return cacheValueNew
  }
  call.cache = cache

  return call as any
}
