import forOwn from './forOwn'

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
>(obj: T, props: K[]): Pick<T, K> {
  const newObj: Pick<T, K> = {} as any
  forOwn(obj, (value, key) => {
    if (props.indexOf(key as any) === -1) {
      (newObj as any)[key] = value
    }
  })
  return newObj
}
