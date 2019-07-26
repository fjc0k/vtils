/**
 * 提取数组中所有子数组的元素合并为一个新数组返回。
 *
 * @param arr 要处理的数组
 * @returns 返回新数组
 * @example
 * ```ts
 * flat([
 *   [1, 2, '3'],
 *   ['', 0],
 * ]) // => [1, 2, '3', '', 0]
 * ```
 */
export function flat<T>(arr: T[][]): T[] {
  const res: T[] = []
  for (const item of arr) {
    res.push(...item)
  }
  return res
}
