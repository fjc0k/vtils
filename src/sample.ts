import { isArray } from './isArray'
import { shuffle } from './shuffle'

/**
 * 从数组或对象中随机获取一个元素。
 *
 * @param value 要取样的值
 * @returns 返回随机获取的元素
 */
export function sample<T>(value: { [key: string]: T } | T[]): T {
  return (
    isArray(value)
      ? shuffle(value)[0]
      : value[shuffle(Object.keys(value))[0]]
  )
}
