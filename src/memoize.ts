import fastMemoize, { Options } from 'fast-memoize'
import { AnyFunction } from './isFunction'

export interface MemoizeOptions<T extends AnyFunction = AnyFunction> {
  createCache?(): {
    set(key: string, value: any): void,
    get(key: string): any,
    has(key: string): boolean,
  },
  serializer?(...args: Parameters<T>): string,
}

/**
 * 函数参数结果缓存。
 *
 * @param fn 要缓存的函数
 * @param [options] 选项
 * @returns 缓存化后的函数
 */
export function memoize<T extends AnyFunction>(fn: T, options?: MemoizeOptions<T>): T {
  let fastMemoizeOptions: Options<T> = undefined
  if (options) {
    fastMemoizeOptions = {}
    if (options.createCache) {
      fastMemoizeOptions.cache = {
        create: options.createCache,
      } as any
    }
    if (options.serializer) {
      fastMemoizeOptions.serializer = args => options.serializer.apply(null, args as any)
    }
  }
  return fastMemoize(fn, fastMemoizeOptions)
}
