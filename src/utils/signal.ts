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
  let isFail = false

  const $resolve: any[] = []
  const $reject: any[] = []

  const setValue: SignalResult<T>['set'] = _value => {
    value = _value
    if ($resolve.length) {
      $resolve.forEach(resolve => resolve(value))
      $resolve.length = 0
      $reject.length = 0
    }
    isOk = true
    isFail = false
  }

  const throwError: SignalResult<T>['throw'] = _error => {
    error = _error
    if ($reject.length) {
      $reject.forEach(reject => reject(error))
      $resolve.length = 0
      $reject.length = 0
    }
    isOk = false
    isFail = true
  }

  const getValue: SignalResult<T>['get'] = () => {
    if (isOk) {
      return Promise.resolve<T>(value)
    }
    if (isFail) {
      return Promise.reject(error)
    }
    return new Promise<T>((resolve, reject) => {
      if (isOk) {
        return resolve(value)
      }
      if (isFail) {
        return reject(error)
      }
      $resolve.push(resolve)
      $reject.push(reject)
    })
  }

  return {
    set: setValue,
    get: getValue,
    throw: throwError,
  }
}
