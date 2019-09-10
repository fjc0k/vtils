import {AnyObject} from './enhanceType'
import {forOwn} from './forOwn'
import {includes} from './includes'

/**
 * 创建一个从 `obj` 中选中的可枚举属性的对象。
 *
 * @param obj 来源对象
 * @param props 选中的可枚举属性
 * @returns 返回结果对象
 * @example
 * ```ts
 * pick({ x: 1, y: 2 }, ['x']) // => { x: 1 }
 * ```
 */
export function pick<
  T extends AnyObject,
  K extends Extract<keyof T, string | number>,
>(obj: T, props: K[]) {
  props = props.map(String) as any
  const newObj: Pick<T, K> = {} as any
  forOwn(obj, (value, key) => {
    if (includes(props, key)) {
      (newObj as any)[key] = value
    }
  })
  return newObj
}
