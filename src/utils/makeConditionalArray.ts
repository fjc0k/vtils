import { IsNever, Merge } from '../types'

export type ConditionalArrayItem<T, K extends keyof T = never> =
  | (IsNever<K> extends true
      ? T
      : Merge<
          T,
          {
            [k in K]: Array<ConditionalArrayItem<T, K>>
          }
        >)
  | false

/**
 * 构造条件数组，即允许一个数组的项出现 false 值，且最终 false 值的项目会被排除。
 *
 * @param array 数组
 * @param childrenKey 子数组键
 */
export function makeConditionalArray<T extends any, K extends keyof T>(
  array: Array<ConditionalArrayItem<T, K>>,
  childrenKey: K,
): T[]
/**
 * 构造条件数组，即允许一个数组的项出现 false 值，且最终 false 值的项目会被排除。
 *
 * @param array 数组
 */
export function makeConditionalArray<T extends any>(
  array: Array<ConditionalArrayItem<T>>,
): T[]
export function makeConditionalArray(array: any[], childrenKey?: any): any[] {
  return array.filter(function filter(item) {
    if (item && childrenKey && Array.isArray(item[childrenKey])) {
      item[childrenKey] = (item[childrenKey] as any).filter(filter)
    }
    return !!item
  }) as any
}

function makeConditionalArrayFork<T extends any>(): (
  array: Array<ConditionalArrayItem<T>>,
) => T[]
function makeConditionalArrayFork<T extends any, K extends keyof T>(
  childrenKey: K,
): (array: Array<ConditionalArrayItem<T, K>>) => T[]
function makeConditionalArrayFork(childrenKey?: any) {
  // @ts-ignore
  return (array: any) => makeConditionalArray(array, childrenKey)
}
makeConditionalArray.fork = makeConditionalArrayFork
