import forOwn from './forOwn'

/**
 * 映射对象的可枚举属性值为一个新的值。
 *
 * @param obj 要遍历的对象
 * @param callback 回调函数
 * @returns 映射后的新对象
 */
export default function mapValues<
  T extends { [key: string]: any },
  K extends Extract<keyof T, string>
>(
  obj: T,
  callback: (value: T[K], key: K, obj: T) => any
): { [key in K]: any } {
  const newObj: any = {}
  forOwn(obj, (value, key, source) => {
    newObj[key] = callback(value, key as K, source)
  })
  return newObj
}
