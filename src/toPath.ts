const cache = Object.create(null)

/**
 * 转化 `value` 为属性路径的数组 。
 *
 * @param value 要转换的值
 * @returns 包含属性路径的数组
 */
export default function toPath(value: string): string[] {
  const path: string[] = []
  for (
    let prev = 0, cur = 0, stop = null, len = value.length;
    cur < len;
  ) {
    const curChar = value[cur]
    if (
      (cur === len - 1) ||
      (stop === null ? (curChar === '.' || curChar === '[') : curChar === stop)
    ) {
      if (cur === len - 1) {
        path.push(value.substring(prev, curChar === ']' ? cur : cur + 1))
      } else if (prev !== cur) {
        path.push(value.substring(prev, cur))
      }
      stop = curChar === '.' ? null :
        curChar === '[' ? ']' :
        null
      prev = cur + 1
    }
    cur++
  }
  return path
}
