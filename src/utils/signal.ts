/**
 * 信号。
 */
export function signal<T>(): Promise<T> & {
  resolve: (value: T) => void
  reject: (err: any) => void
} {
  let _resolve: any
  let _reject: any

  let resolved = false
  let resolvedValue: any
  const resolve = (value: any) => {
    if (!resolved) {
      resolved = true
      resolvedValue = value
      _resolve?.(value)
    }
  }

  let rejected = false
  let rejectedValue: any
  const reject = (value: any) => {
    if (!rejected) {
      rejected = true
      rejectedValue = value
      _reject?.(value)
    }
  }

  const s: any = new Promise(($resolve, $reject) => {
    if (resolved) {
      $resolve(resolvedValue)
    } else if (rejected) {
      $reject(rejectedValue)
    } else {
      _resolve = $resolve
      _reject = $reject
    }
  })

  s.resolve = resolve
  s.reject = reject

  return s
}
