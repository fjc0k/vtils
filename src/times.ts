/**
 * 调用 `fn` n 次，将每次的调用结果存进数组并返回。
 *
 * @param n 调用次数
 * @param fn 调用函数
 * @returns 调用结果的数组
 */
export default function times<T extends(index: number) => any> (n: number, fn: T): Array<ReturnType<T>> {
  const result: any[] = []
  for (let i = 0; i < n; i++) {
    result.push(fn(i))
  }
  return result
}
