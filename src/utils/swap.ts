/**
 * 原地交换数组中的两个元素。
 *
 * @param arr 要处理的数组
 * @param i 第一个元素的索引
 * @param j 第二个元素的索引
 * @returns 返回交换后的数组
 * @example
 * ```typescript
 * swap([1, 2, 3], 0, 2) // => [3, 2, 1]
 * ```
 */
export function swap<T>(arr: T[], i: number, j: number): T[] {
  const iItem = arr[i]
  arr[i] = arr[j]
  arr[j] = iItem
  return arr
}
