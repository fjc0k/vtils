import forOwn from './forOwn'

export type ValuesResult<T> = Array<T[keyof T]>

/**
 * 返回 obj 自身可枚举属性的值为数组。
 *
 * @param obj 要检索的对象
 * @returns 结果数组
 */
export default function values<T extends object>(obj: T): ValuesResult<T> {
  const result: ValuesResult<T> = []
  forOwn(obj, value => result.push(value))
  return result
}
