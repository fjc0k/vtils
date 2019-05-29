import { LiteralUnion } from './enhanceType'

export type GetTypeReturn = LiteralUnion<(
  'Undefined' |
  'Null' |
  'Array' |
  'String' |
  'Arguments' |
  'Function' |
  'Error' |
  'Boolean' |
  'Number' |
  'Date' |
  'RegExp' |
  'Object' |
  'JSON' |
  'Math' |
  'Symbol' |
  'Map' |
  'Set' |
  'WeakMap' |
  'WeakSet'
), string>

/**
 * 检测 `value` 的类型。
 *
 * @param value 要检测的值
 * @returns 返回检测值的类型
 * @see https://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring
 * @see https://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2
 */
export function getType(value: any): GetTypeReturn {
  return Object.prototype.toString.call(value).slice(8, -1)
}
