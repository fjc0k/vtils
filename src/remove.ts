/**
 * 根据索引原地删除数组中指定的值。
 *
 * @param data 要操作的数组
 * @param index 要删除值的索引
 * @returns 返回传入的数组
 * @example
 * ```ts
 * remove([1, 2, 3], 1) // => [1, 3]
 * ```
 */
export function remove<T extends any[]>(data: T, index: number): T {
  if (index > -1 && index < data.length) {
    data.splice(index, 1)
  }
  return data
}
