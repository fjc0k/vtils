import { nthArg } from 'lodash-uni'
import { sampleBy } from './sampleBy'

/**
 * 从集合中随机获得一个元素的索引（数组）或键（对象）。
 *
 * @param collection 集合
 */
export function sampleIndex<T>(collection: T[]): number | undefined
export function sampleIndex<T extends Record<any, any>>(
  collection: T,
): keyof T | undefined
export function sampleIndex(collection: any): any {
  return sampleBy(collection, nthArg(1))
}
