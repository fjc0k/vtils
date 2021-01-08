/**
 * `Promise.all(data.map(callback))` 的简写。
 *
 * @param list 列表数据
 * @param callback 回调
 * @example
 * ```typescript
 * const res = await pMap(
 *   [1, 2],
 *   i => Promise.resolve(i),
 * )
 * // => [1, 2]
 * ```
 */
export function pMap<T, R>(
  list: T[],
  callback: (item: T, index: number, list: T[]) => R | PromiseLike<R>,
): Promise<R[]> {
  return Promise.all(list.map(callback))
}
