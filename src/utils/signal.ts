export interface SignalResult<T> {
  set(value: T): void
  throw(error: any): void
  get(): Promise<T>
}

/**
 * 信号。
 */
export function signal<T>(): SignalResult<T> {
  let value!: T
  let isOk = false

  let error!: any
  let isException = false

  let $resolve: any
  let $reject: any

  const setValue: SignalResult<T>['set'] = _value => {
    value = _value
    if ($resolve) {
      $resolve(value)
      $resolve = null
      $reject = null
    }
    isOk = true
    isException = false
  }

  const throwError: SignalResult<T>['throw'] = _error => {
    error = _error
    if ($reject) {
      $reject(error)
      $resolve = null
      $reject = null
    }
    isOk = false
    isException = true
  }

  const getValue: SignalResult<T>['get'] = () => {
    if (isOk) {
      return Promise.resolve<T>(value)
    }
    if (isException) {
      return Promise.reject(error)
    }
    return new Promise<T>((resolve, reject) => {
      if (isOk) {
        return resolve(value)
      }
      if (isException) {
        return reject(error)
      }
      $resolve = resolve
      $reject = reject
    })
  }

  return {
    set: setValue,
    get: getValue,
    throw: throwError,
  }
}
