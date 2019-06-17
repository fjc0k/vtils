import { isNaN, isNil } from './is'

/**
 * 检查 `value` 是否是 `null`、`undefined`、`NaN`，是则返回 `defaultValue`，否则返回 `value`。
 *
 * @param value 要检查的值
 * @param defaultValue 默认值
 * @returns 返回结果值
 * @example
 * ```ts
 * defaultTo(1, 2) // => 1
 * defaultTo(NaN, 2) // => 2
 * defaultTo(null, 2) // => 2
 * defaultTo(undefined, 2) // => 2
 * ```
 */
export function defaultTo<T>(value: T, defaultValue: T): T {
  return isNil(value) || isNaN(value) ? defaultValue : value
}
