/**
 * 当 `index` 为 `-1` 时，返回 `defaultIndex`。
 *
 * @param index 要判断的索引
 * @param defaultIndex 默认索引
 * @returns 返回索引
 * @example
 * ```ts
 * defaultIndexTo(-1, 0) // => 0
 * defaultIndexTo(0, 0) // => 0
 * defaultIndexTo(1, 0) // => 1
 * ```
 */
export function defaultIndexTo(index: number, defaultIndex: number) {
  return index === -1 ? defaultIndex : index
}
