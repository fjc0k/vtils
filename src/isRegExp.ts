import getType from './getType'

/**
 * 检查 `value` 是否是一个正则表达式。
 *
 * @param value 要检查的值
 * @returns 是（true）或否（false）
 */
export default function isRegExp (value: any): value is RegExp {
  return getType(value) === 'RegExp'
}
