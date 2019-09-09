/**
 * 原地删除数组中第一次出现的指定值。
 *
 * @param data 要操作的数组
 * @param value 要删除的值
 * @returns 返回传入的数组
 * @example
 * ```ts
 * removeByValue([1, 2, 3], 1) // => [2, 3]
 * ```
 */
export function removeByValue<V>(data: V[], value: V): V[] {
  const index = data.indexOf(value)
  if (index !== -1) {
    data.splice(index, 1)
  }
  return data
}
