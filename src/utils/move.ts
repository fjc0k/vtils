/**
 * 原地移动数组中的元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @param to 要移动到的位置索引
 * @returns 返回移动后的数组
 * @example
 * ```typescript
 * move([1, 2, 3], 0, 1) // => [2, 1, 3]
 * ```
 */
export function move<T>(arr: T[], from: number, to: number): T[] {
  if (arr.length === 0 || from >= arr.length || from === to) return arr
  const item = arr.splice(from, 1)[0]
  arr.splice(to, 0, item)
  return arr
}
