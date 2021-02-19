import { forOwn, isArray, isObject, sample } from 'lodash-uni'

/**
 * 从集合中随机获得一个元素的迭代值。
 *
 * @param collection 集合
 * @param iteratee 迭代函数
 */
export function sampleBy<T, X>(
  collection: T[],
  iteratee: (element: T, index: number) => X,
): X | undefined
export function sampleBy<T extends Record<any, any>, X>(
  collection: T,
  iteratee: <K extends keyof T>(value: T[K], key: K) => X,
): X | undefined
export function sampleBy(collection: any, iteratee: any): any {
  if (isArray(collection)) {
    return sample(collection.map(iteratee))
  } else if (isObject(collection)) {
    const values: any[] = []
    forOwn(collection, (v, k) => values.push(iteratee(v, k)))
    return sample(values)
  }
  return undefined
}
