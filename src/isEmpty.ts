import { isPlainObject } from './isPlainObject'

/**
 * 检查 `value` 是否是空值，包括：`undefined`、`null`、`''`、`false`、`true`、`[]`、`{}`。
 *
 * @param value 要检查的值
 * @returns `value` 是空值返回 `true`，否则返回 `false`
 */
export function isEmpty(value: any): boolean {
  return [undefined, null, '', false, true].some(item => item === value)
    || (Array.isArray(value) && value.length === 0)
    || (isPlainObject(value) && (() => {
      for (const _ in value) {
        return false
      }
      return true
    })())
}
