import { chunk } from 'lodash-uni'

/**
 * 类似 `chunk`，但当每组条目数量不一致时会在最后一组添加填充值以达到每组条目数量一致。
 *
 * @param array 数组
 * @param size 分组大小
 * @param filler 填充值
 */
export function chunkEqual<T>(
  array: T[],
  size: number,
  filler: (index: number) => T,
): T[][] {
  if (1 < size && size < array.length) {
    array = array.slice()
    for (let i = 0, l = array.length, n = size - (l % size); i < n; i++) {
      array.push(filler(l + i))
    }
  }
  return chunk(array, size)
}
