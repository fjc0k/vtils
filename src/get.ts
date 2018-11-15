import has from './has'
import toPath, { ToPathValue } from './toPath'

/**
 * 根据 `obj` 对象的路径 `path` 获取值。
 *
 * @param obj 要检索的对象
 * @param path 属性路径
 * @param [defaultValue] 默认值
 * @returns 检索结果
 */
export default function get (obj: object, path: ToPathValue, defaultValue?: any): any {
  const normalizedPath = toPath(path)
  let last: any = obj
  for (let i = 0, len = normalizedPath.length; i < len; i++) {
    if (has(last, normalizedPath[i] as string)) {
      last = last[normalizedPath[i]]
      if (i === len - 1) {
        return last
      }
    } else {
      return defaultValue
    }
  }
}
