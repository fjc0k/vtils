import has from './has'
import isObject from './isObject'
import toPath from './toPath'

/**
 * 根据 obj 对象的路径 path 设置值。
 *
 * @param obj 要检索的对象
 * @param path 属性路径
 * @param value 要设置的值
 */
export default function set(obj: object, path: string | string[], value: any): void {
  path = Array.isArray(path) ? path : toPath(path)
  let last: any = obj
  for (let i = 0, len = path.length; i < len; i++) {
    if (i === len - 1) {
      last[path[i]] = value
    } else {
      last = last[path[i]] = isObject(last[path[i]]) ? last[path[i]] : {}
    }
  }
}
