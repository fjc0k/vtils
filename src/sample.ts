import { AnyObject } from './enhanceType'
import { isArray } from './is'
import { shuffle } from './shuffle'

/**
 * 从数组中随机获取一个元素。
 *
 * @param arr 要取样的数组
 * @returns 返回随机获取的元素
 */
export function sample<T>(arr: T[]): T

/**
 * 从对象中随机获取一个可枚举属性的值。
 *
 * @param obj 要取样的对象
 * @returns 返回随机获取的可枚举属性的值
 */
export function sample<T extends AnyObject>(obj: T): Extract<T[keyof T], string | number>

export function sample(value: any): any {
  return (
    isArray(value)
      ? shuffle(value)[0]
      : value[shuffle(Object.keys(value))[0]]
  )
}
