import forOwn from './forOwn'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

/**
 * 创建一个从 obj 中剔除选中的属性的对象。
 *
 * @param obj 来源对象
 * @param props 要剔除的属性
 * @returns 结果对象
 */
export default function omit<
  T extends { [key: string]: any },
  K extends Extract<keyof T, string>
>(obj: T, props: K[]): Omit<T, K> {
  const newObj: any = {}
  forOwn(obj, (value: T[K], key: K) => {
    if (props.indexOf(key) === -1) {
      newObj[key] = value
    }
  })
  return newObj
}
