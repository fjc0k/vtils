import { AnyObject, EnumerableKey, forOwn } from './forOwn'

/**
 * 创建一个从 `obj` 中选中的可枚举属性的对象。
 *
 * @param obj 来源对象
 * @param props 选中的可枚举属性
 * @returns 结果对象
 */
export function pick<
  T extends AnyObject,
  K extends EnumerableKey<keyof T>
>(obj: T, props: K[]) {
  const newObj: Pick<T, K> = {} as any
  forOwn(obj, (value: T[K], key: K) => {
    if (props.indexOf(key) > -1) {
      newObj[key] = value
    }
  })
  return newObj
}
