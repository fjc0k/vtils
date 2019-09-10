import {isFunction} from './is'

export interface PluckGetValueIteratee<T, V> {
  (item: T, index: number, data: T[]): V,
}

export interface PluckGetKeyIteratee<T, K> {
  (item: T, index: number, data: T[]): K,
}

/**
 * 将数据中每一项的迭代值组合成一个数组返回。
 *
 * @param data 数据
 * @param getValueIteratee 值的迭代函数
 * @returns 返回结果数组
 * @example
 * ```ts
 * pluck(
 *   [{ id: 1, name: 'Jay' }, { id: 2, name: 'Lily' }],
 *   item => item.name,
 * ) // => ['Jay', 'Lily']
 * ```
 */
export function pluck<T, V>(
  data: T[],
  getValueIteratee: PluckGetValueIteratee<T, V>,
): V[]

/**
 * 将数据中每一项的迭代值组合成一个对象返回。
 *
 * @param data 数据
 * @param getValueIteratee 值的迭代函数
 * @param getKeyIteratee 键的迭代函数
 * @returns 返回结果对象
 * @example
 * ```ts
 * pluck(
 *   [{ id: 1, name: 'Jay' }, { id: 2, name: 'Lily' }],
 *   item => item.name,
 *   item => item.id,
 * ) // => { 1: 'Jay', 2: 'Lily' }
 * ```
 */
export function pluck<T, V, K extends keyof any>(
  data: T[],
  getValueIteratee: PluckGetValueIteratee<T, V>,
  getKeyIteratee: PluckGetKeyIteratee<T, K>,
): Record<K, V>

export function pluck(data: any[], getValueIteratee: any, getKeyIteratee?: any): any {
  if (!isFunction(getKeyIteratee)) {
    return data.map(getValueIteratee)
  }
  return data.reduce(
    (result, item, index) => {
      const key = getKeyIteratee(item, index, data)
      const value = getValueIteratee(item, index, data)
      result[key] = value
      return result
    },
    {},
  )
}
