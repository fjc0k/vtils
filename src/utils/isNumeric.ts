import { isNaN } from 'lodash-uni'

/**
 * 检查 `value` 是否是数值，需要注意的是 `Infinity`、`-Infinity`、`NaN` 不被认为是数值。
 *
 * @param value 要检查的值
 * @returns 返回检查结果
 * @example
 * ```typescript
 * isNumeric(1) // => true
 * isNumeric('1') // => true
 * ```
 */
export function isNumeric(value: any): value is number | string {
  return value != null && !isNaN(value - parseFloat(value))
}
