import { AnyFunction } from './enhanceType'
import { ii } from './ii'

export interface MemoizeCache {
  /** 设置缓存 */
  set(key: string, value: any): void,
  /** 是否存在缓存 */
  has(key: string): boolean,
  /** 获取缓存 */
  get(key: string): any,
  /** 删除缓存 */
  delete(key: string): void,
  /** 清空缓存 */
  clear(): void,
}

export interface MemoizeOptions<T extends AnyFunction = AnyFunction> {
  /**
   * 创建缓存容器。
   */
  createCache?(): MemoizeCache,
  /**
   * 序列化函数实参。
   */
  serializer?(...args: Parameters<T>): string,
}

export type MemoizeReturn<T extends AnyFunction = AnyFunction> = T & {
  /** 缓存容器 */
  readonly cache: MemoizeCache,
  /** 上一次执行函数时的缓存键名 */
  readonly lastCacheKey: string,
}

/**
 * 函数结果缓存。
 *
 * @param fn 要缓存的函数
 * @param options 选项
 * @returns 返回缓存化后的函数
 * @example
 * ```ts
 * let i = 0
 * const fn = memoize(() => i++)
 * fn() // => 0
 * fn() // => 0
 * ```
 */
export function memoize<T extends AnyFunction>(
  fn: T,
  options: MemoizeOptions<T> = {},
): MemoizeReturn<T> {
  const cache = ii(
    options.createCache
      || ((): MemoizeCache => {
        if (typeof Map === 'function' && Map.prototype.hasOwnProperty('clear')) {
          return new Map()
        }
        const cache = Object.create(null)
        return {
          set(k, v) {
            cache[k] = v
          },
          has(k) {
            return (k in cache)
          },
          get(k) {
            return cache[k]
          },
          delete(k) {
            delete cache[k]
          },
          clear() {
            Object.keys(cache).forEach(k => {
              delete cache[k]
            })
          },
        }
      }),
  )
  const memoizedFn: any = (...args: Parameters<T>) => {
    const cacheKey = (
      options.serializer
      || ((...args) => args.join(')`('))
    )(...args)
    memoizedFn.lastCacheKey = cacheKey
    if (!cache.has(cacheKey)) {
      cache.set(cacheKey, fn(...args))
    }
    return cache.get(cacheKey)
  }
  memoizedFn.cache = cache
  return memoizedFn
}
