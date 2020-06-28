import { forOwn, has, isPlainObject } from 'lodash-es'

/**
 * 遍历对象和数组。
 *
 * @param value 要遍历的值
 * @param callback 遍历回调
 * @returns 返回结果
 * @example
 * ```typescript
 * traverse([1, 2, {3: 4}], value => {
 *   console.log(value)
 *   // => 1
 *   // => 2
 *   // => {3: 4}
 *   // => 4
 * })
 * ```
 */
export function traverse(
  value: any,
  callback: (value: any, key: string | number, parent: any) => any,
): void {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      callback(item, index, value)
      if (value[index] !== undefined) {
        traverse(item, callback)
      }
    })
  } else if (isPlainObject(value)) {
    forOwn(value, (item, key) => {
      callback(item, key, value)
      if (has(value, key)) {
        traverse(item, callback)
      }
    })
  }
}
