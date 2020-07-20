/**
 * 是否是渲染后可见的值。
 * 渲染后不可见的值包括：`undefined`、`null`、`true`、`false`、空字符串。
 *
 * @param value 值
 * @returns 返回结果
 * ```typescript
 * isVisibleValue(null) // => false
 * isVisibleValue(0) // => true
 * ```
 */
export function isVisibleValue(value: any): boolean {
  // ref: https://reactjs.org/docs/jsx-in-depth.html#booleans-null-and-undefined-are-ignored
  return value != null && value !== true && value !== false && value !== ''
}
