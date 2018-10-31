/**
 * 检查 value 是否是一个函数。
 *
 * @param value 要检查的值
 * @returns 是（true）或者不是（false）一个函数
 */
export default function isFunction(value: any): value is Function { // tslint:disable-line
  return typeof value === 'function'
}
