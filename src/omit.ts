import { AnyObject, Omit } from './enhanceType'
import { forOwn } from './forOwn'
import { includes } from './includes'

/**
 * 创建一个从 `obj` 中剔除选中的可枚举属性的对象。
 *
 * @param obj 来源对象
 * @param props 要剔除的可枚举属性
 * @returns 返回结果对象
 */
export function omit<
  T extends AnyObject,
  K extends Extract<keyof T, string | number>,
>(obj: T, props: K[]) {
  props = props.map(String) as any
  const newObj: Omit<T, K> = {} as any
  forOwn(obj, (value, key) => {
    if (!includes(props, key)) {
      (newObj as any)[key] = value
    }
  })
  return newObj
}
