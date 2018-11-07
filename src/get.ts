import has from './has'
import toPath from './toPath'

/**
 * 根据 obj 对象的路径 path 获取值。
 *
 * @param obj 要检索的对象
 * @param path 属性路径
 * @param [defaultValue] 默认值
 * @returns 检索结果
 */
export default function get(obj: object, path: string | string[], defaultValue?: any): any {
  path = Array.isArray(path) ? path : toPath(path)
  let last: any = obj
  for (let i = 0, len = path.length; i < len; i++) {
    if (has(last, path[i])) {
      last = last[path[i]]
      if (i === len - 1) {
        return last
      }
    } else {
      return defaultValue
    }
  }
}
