import { AnyObject, EnumerableKey, forOwn } from './forOwn'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * 创建一个从 `obj` 中剔除选中的可枚举属性的对象。
 *
 * @param obj 来源对象
 * @param props 要剔除的可枚举属性
 * @returns 返回结果对象
 */
export function omit<
  T extends AnyObject,
  K extends EnumerableKey<keyof T>
>(obj: T, props: K[]) {
  const newObj: Omit<T, K> = {} as any
  forOwn(obj, (value: T[K], key: K) => {
    if (props.indexOf(key) === -1) {
      (newObj as any)[key] = value
    }
  })
  return newObj
}
