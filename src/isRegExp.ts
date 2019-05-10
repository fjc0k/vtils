import { getType } from './getType'

/**
 * 检查 `value` 是否是一个正则对象。
 *
 * @param value 要检查的值
 * @returns `value` 是正则对象返回 `true`，否则返回 `false`
 */
export function isRegExp(value: any): value is RegExp {
  return getType(value) === 'RegExp'
}
