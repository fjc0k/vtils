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
  const total = arr.length
  if (total === 0 || from < 0 || from >= total) return arr
  to = Math.min(total - 1, Math.max(0, to))
  if (from === to) return arr
  const item = arr.splice(from, 1)[0]
  arr.splice(to, 0, item)
  return arr
}

/**
 * 原地上移数组中的某个元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @param step 移动步值
 * @returns 返回移动后的数组
 * @example
 * ```typescript
 * moveUp([1, 2, 3], 2) // => [1, 3, 2]
 * moveUp([1, 2, 3], 2, 2) // => [3, 1, 2]
 * ```
 */
export function moveUp<T>(arr: T[], from: number, step = 1): T[] {
  return move(arr, from, from - step)
}

/**
 * 原地下移数组中的某个元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @param step 移动步值
 * @returns 返回移动后的数组
 * @example
 * ```typescript
 * moveDown([1, 2, 3], 0) // => [2, 1, 3]
 * moveDown([1, 2, 3], 0, 2) // => [2, 3, 1]
 * ```
 */
export function moveDown<T>(arr: T[], from: number, step = 1): T[] {
  return move(arr, from, from + step)
}

/**
 * 原地置顶数组中的某个元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @returns 返回移动后的数组
 * @example
 * ```typescript
 * moveToTop([1, 2, 3], 2) // => [3, 1, 2]
 * ```
 */
export function moveToTop<T>(arr: T[], from: number): T[] {
  return move(arr, from, 0)
}

/**
 * 原地置底数组中的某个元素。
 *
 * @param arr 要处理的数组
 * @param from 要移动元素的索引
 * @returns 返回移动后的数组
 * @example
 * ```typescript
 * moveToBottom([1, 2, 3], 0) // => [2, 3, 1]
 * ```
 */
export function moveToBottom<T>(arr: T[], from: number): T[] {
  return move(arr, from, arr.length - 1)
}
