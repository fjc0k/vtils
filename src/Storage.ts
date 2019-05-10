import { inBrowser } from './inBrowser'
import { isArray } from './isArray'
import { isFunction } from './isFunction'
import { isObject } from './isObject'
import { reduce } from './reduce'

export interface StorageDriverReturn {
  set(k: string, v: any): Promise<void>,
  setSync(k: string, v: any): void,
  get(k: string): Promise<any>,
  getSync(k: string): any,
  remove(k: string): Promise<void>,
  removeSync(k: string): void,
  clear(): Promise<void>,
  clearSync(): void,
}

export type StorageDriver = () => StorageDriverReturn

const noopStorageDriver: StorageDriver = () => ([
  ['set', undefined],
  ['get', null],
  ['remove', undefined],
  ['clear', undefined],
] as Array<[keyof StorageDriverReturn, any]>).reduce<StorageDriverReturn>(
  (res, [action, defaultValue]) => {
    res[action] = () => Promise.resolve(defaultValue)
    ;(res as any)[`${action}Sync`] = () => defaultValue
    return res
  },
  {} as any,
)

const browserStorageDriver = (type: 'local' | 'session'): StorageDriverReturn => {
  if (!inBrowser()) return noopStorageDriver()
  const storage = type === 'local' ? localStorage : sessionStorage
  const driver: StorageDriverReturn = {
    set(k, v) {
      return Promise.resolve(driver.setSync(k, v))
    },
    setSync(k, v) {
      if (v != null) {
        storage.setItem(k, JSON.stringify(v))
      }
    },
    get(k) {
      return Promise.resolve(driver.getSync(k))
    },
    getSync(k) {
      let value = null
      try {
        value = JSON.parse(storage.getItem(k))
      } catch (err) {}
      return value
    },
    remove(k) {
      return Promise.resolve(driver.removeSync(k))
    },
    removeSync(k) {
      storage.removeItem(k)
    },
    clear() {
      return Promise.resolve(driver.clearSync())
    },
    clearSync() {
      storage.clear()
    },
  }
  return driver
}

export const browserLocalStorageDriver: StorageDriver = () => browserStorageDriver('local')

export const browserSessionStorageDriver: StorageDriver = () => browserStorageDriver('session')

export const weappStorageDriver: StorageDriver = () => {
  const flag = '&#+^vtils^%_$'
  return {
    set(k, v) {
      return new Promise((resolve, reject) => {
        wx.setStorage({
          key: k,
          data: [flag, v],
          success: resolve,
          fail: reject,
        })
      })
    },
    setSync(k, v) {
      if (v != null) {
        wx.setStorageSync(k, [flag, v])
      }
    },
    get(k) {
      return new Promise(resolve => {
        wx.getStorage({
          key: k,
          success: res => {
            resolve(
              isArray(res.data) && res.data[0] === flag
                ? res.data[1]
                : null,
            )
          },
          fail: () => resolve(null),
        })
      })
    },
    getSync(k) {
      try {
        const v = wx.getStorageSync(k)
        return isArray(v) && v[0] === flag
          ? v[1]
          : null
      } catch (e) {
        return null
      }
    },
    remove(k) {
      return new Promise((resolve, reject) => {
        wx.removeStorage({
          key: k,
          success: resolve as any,
          fail: reject,
        })
      })
    },
    removeSync(k) {
      wx.removeStorageSync(k)
    },
    clear() {
      return new Promise((resolve, reject) => {
        (wx.clearStorage as any)({
          success: resolve as any,
          fail: reject,
        })
      })
    },
    clearSync() {
      wx.clearStorageSync()
    },
  }
}

export const memoryStorageDriver: StorageDriver = () => {
  const storage = Object.create(null)
  return reduce(
    {
      setSync(k, v) {
        if (v != null) {
          storage[k] = v
        }
      },
      getSync(k) {
        return (k in storage) ? storage[k] : null
      },
      removeSync(k) {
        delete storage[k]
      },
      clearSync() {
        Object.keys(storage).forEach(k => {
          delete storage[k]
        })
      },
    } as Partial<StorageDriverReturn>,
    (res, action, actionName) => {
      res[actionName] = action
      res[actionName.slice(0, -4)] = (...args: any[]) => Promise.resolve((action as any)(...args))
      return res
    },
    {} as any,
  )
}

export interface StorageOptions {
  driver?: StorageDriver,
}

export class Storage<
  T extends Record<string, any> = Record<string, any>,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
> {
  private driver: StorageDriverReturn

  constructor(private driverOrOptions: StorageDriver | StorageOptions) {
    this.driver = (isObject(driverOrOptions) && isObject((driverOrOptions as StorageOptions).driver))
      ? (driverOrOptions as StorageOptions).driver()
      : (driverOrOptions as StorageDriver)()
  }

  set(kv: Partial<Record<K, T[K]>>): Promise<any> {
    return Promise.all(
      Object.keys(kv).map(key => (
        this.driver.set(key, (kv as any)[key])
      )),
    )
  }

  setSync(kv: Partial<Record<K, T[K]>>): void {
    Object.keys(kv).forEach(key => {
      this.driver.set(key, (kv as any)[key])
    })
  }

  get<DV extends T[K] | (() => (T[K] | Promise<T[K]>))>( // eslint-disable-line
    key: K,
    defaultValue: DV = null,
  ): Promise<T[K]> { // eslint-disable-line
    return new Promise((resolve, reject) => {
      this.driver.get(key)
        .then(value => {
          if (value != null) {
            return value
          }
          return isFunction(defaultValue) ? defaultValue() : defaultValue
        })
        .then(resolve)
        .catch(reject)
    })
  }

  getSync<DV extends T[K] | (() => T[K])>( // eslint-disable-line
    key: K,
    defaultValue: DV = null,
  ): T[K] { // eslint-disable-line
    let value = this.driver.getSync(key)
    if (value == null) {
      value = isFunction(defaultValue) ? defaultValue() : defaultValue
    }
    return value
  }

  remove(key: K) {
    return this.driver.remove(key)
  }

  removeSync(key: K) {
    return this.driver.removeSync(key)
  }

  clear() {
    return this.driver.clear()
  }

  clearSync() {
    return this.driver.clearSync()
  }
}
