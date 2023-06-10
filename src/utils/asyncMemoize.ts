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
   * @default 0
   */
  cacheTTL?: number
}

/**
 * 异步函数执行缓存。
 *
 * @param asyncFn 异步函数
 * @param options 选项
 */
export function asyncMemoize<T extends (...args: any[]) => Promise<any>>(
  asyncFn: T,
  options: AsyncMemoizeOptions<T> = {},
): T {
  const { cacheKey = (...args: any[]) => args[0], cacheTTL } = options
  const cache = new Map<
    string,
    {
      value: any
      expiredAt: number
    }
  >()

  const call = (...args: any[]) => {
    const _cacheKey = cacheKey(...args)
    const cacheValue = cache.get(_cacheKey)
    const currentMs = Date.now()
    if (
      cacheValue &&
      (cacheValue.expiredAt ? currentMs < cacheValue.expiredAt : true)
    ) {
      return cacheValue.value
    }
    const cacheValueNew = asyncFn(...args)
    cacheValueNew.catch(() => cache.delete(_cacheKey))
    cache.set(_cacheKey, {
      value: cacheValueNew,
      expiredAt: cacheTTL ? currentMs + cacheTTL : 0,
    })
    return cacheValueNew
  }

  return call as any
}
