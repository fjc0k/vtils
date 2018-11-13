import forOwn from './forOwn'

/**
 * 创建一个从 `obj` 中选中的属性的对象。
 *
 * @param obj 来源对象
 * @param props 选中的属性
 * @returns 结果对象
 */
export default function pick<
  T extends { [key: string]: any },
  K extends Extract<keyof T, string>
>(obj: T, props: K[]): Pick<T, K> {
  const newObj: any = {}
  forOwn(obj, (value: T[K], key: K) => {
    if (props.indexOf(key) > -1) {
      newObj[key] = value
    }
  })
  return newObj
}
