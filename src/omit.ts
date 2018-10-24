import forOwn from './forOwn'

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * 创建一个从 obj 中剔除选中的属性的对象。
 *
 * @param obj 来源对象
 * @param props 要剔除的属性
 * @returns 结果对象
 */
export default function omit<
  T extends object,
  K extends keyof T
>(obj: T, props: K[]): Omit<T, K> {
  const newObj: Omit<T, K> = {} as any
  forOwn(obj, (value, key) => {
    if (props.indexOf(key as any) === -1) {
      (newObj as any)[key] = value
    }
  })
  return newObj
}
