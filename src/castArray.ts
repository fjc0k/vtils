/**
 * 如果 `value` 不是数组，那么强制转为数组。
 *
 * @param value 要处理的值
 * @returns 返回转换后的数组
 */
export function castArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}
