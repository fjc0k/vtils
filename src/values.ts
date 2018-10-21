import forOwn from './forOwn'

/**
 * 返回 obj 自身可枚举属性的值为数组。
 *
 * @param obj 要检索的对象
 * @returns 结果数组
 */
export default function values<
  T extends { [key: string]: any },
  K extends keyof T
>(obj: T): Array<T[K]> {
  const result: Array<T[K]> = []
  forOwn(obj, value => result.push(value))
  return result
}
