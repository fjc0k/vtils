/**
 * 原地移动数组中的元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @param to 要移动到的位置索引
 * @returns 返回移动后的数组
 * @example
 * ```ts
 * move([1, 2, 3], 0, 1) // => [2, 1, 3]
 * ```
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  const startIndex = to < 0 ? arr.length + to : to
  const item = arr.splice(from, 1)[0]
  arr.splice(startIndex, 0, item)
  return arr
}
