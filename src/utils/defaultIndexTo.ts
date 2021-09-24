/**
 * 设置默认索引。当前索引为 `-1` 或 `NaN` 时会使用默认索引。
 *
 * @param index 当前索引
 * @param defaultIndex 默认索引
 */
export function defaultIndexTo(index: number, defaultIndex: number): number {
  return index < 0 || index !== index ? defaultIndex : index
}
