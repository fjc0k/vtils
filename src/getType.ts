/**
 * 检测 value 值的类型。
 *
 * @export
 * @param value 要检测的值
 * @returns 检测值的类型
 */
export default function getType(value: any): string {
  return Object.prototype.toString.call(value).slice(8, -1)
}
