/**
 * 如果 `value` 是数组，直接返回；如果 `value` 不是数组，返回 `[value]`。
 *
 * @param value 要处理的值
 * @returns 返回转换后的数组
 * @example
 * ```ts
 * castArray([123, 456]) // => [123, 456]
 * castArray(123) // => [123]
 * castArray('hello') // => ['hello']
 * castArray(null) // => [null]
 * ```
 */
export function castArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}
