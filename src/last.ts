import { If, IsNever } from './enhanceType'

/**
 * 返回数组 `arr` 的最后一项。
 *
 * @param arr 数组
 * @returns 返回数组的最后一项
 */
export function last<T>(arr: T[]): If<IsNever<T>, undefined, T | undefined> {
  return (arr.length ? arr[arr.length - 1] : undefined) as any
}
