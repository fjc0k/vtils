import { isObject } from './isObject'
import { toPath, ToPathValue } from './toPath'

/**
 * 根据 `obj` 对象的路径 `path` 设置值。
 *
 * @param obj 要检索的对象
 * @param path 属性路径
 * @param value 要设置的值
 */
export function set(obj: object, path: ToPathValue, value: any): void {
  const normalizedPath = toPath(path)
  let last: any = obj
  for (let i = 0, len = normalizedPath.length; i < len; i++) {
    if (i === len - 1) {
      last[normalizedPath[i]] = value
    } else {
      last = last[normalizedPath[i]] = isObject(last[normalizedPath[i]]) ? last[normalizedPath[i]] : {}
    }
  }
}
