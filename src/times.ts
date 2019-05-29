/**
 * 调用函数 `n` 次，将每次的调用结果存进数组并返回。
 *
 * @param n 调用次数
 * @param fn 调用函数
 * @returns 返回每次的调用结果组成的数组
 */
export function times<T extends (index: number) => any> (n: number, fn: T): Array<ReturnType<T>> { // eslint-disable-line
  const result: any[] = []
  for (let i = 0; i < n; i++) {
    result.push(fn(i))
  }
  return result
}
