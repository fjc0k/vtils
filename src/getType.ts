export type ValueType = (
  'Undefined' | 'Null' | 'Array'
    | 'String' | 'Arguments' | 'Function'
    | 'Error' | 'Boolean' | 'Number'
    | 'Date' | 'RegExp' | 'Object'
    // ES5 中还有以下两个类型，ES6 中它们都是 Object 类型
    | 'JSON' | 'Math'
)

/**
 * 检测 value 值的类型。
 *
 * @param value 要检测的值
 * @returns 检测值的类型
 * @see https://www.ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring
 * @see https://www.ecma-international.org/ecma-262/5.1/#sec-8.6.2
 */
export default function getType(value: any): ValueType {
  return Object.prototype.toString.call(value).slice(8, -1)
}
