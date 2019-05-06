import { inBrowser } from './inBrowser'
import { isFunction } from './isFunction'
import { isObject } from './isObject'
import { reduce } from './reduce'

export interface StorageDriver {
  set(k: string, v: any): Promise<void>,
  setSync(k: string, v: any): void,
  has(k: string): Promise<boolean>,
  hasSync(k: string): boolean,
  get(k: string): Promise<any>,
  getSync(k: string): any,
  remove(k: string): Promise<void>,
  removeSync(k: string): void,
  clear(): Promise<void>,
  clearSync(): void,
  count(): Promise<number>,
  countSync(): number,
  keys(): Promise<string[]>,
  keysSync(): string[],
}

export type GetStorageDriver = () => StorageDriver

const getNoopStorageDriver: GetStorageDriver = () => ([
  ['set', undefined],
  ['has', false],
  ['get', null],
  ['remove', undefined],
  ['clear', undefined],
  ['count', 0],
  ['keys', []],
] as Array<[keyof StorageDriver, any]>).reduce<StorageDriver>(
  (res, [action, defaultValue]) => {
    res[action] = () => Promise.resolve(defaultValue)
    ;(res as any)[`${action}Sync`] = () => defaultValue
    return res
  },
  {} as any,
)

const getBrowserStorageDriver = (type: 'local' | 'session'): StorageDriver => {
  if (!inBrowser()) return getNoopStorageDriver()
  const storage = type === 'local' ? localStorage : sessionStorage
  const driver: StorageDriver = {
    set(k, v) {
      return Promise.resolve(driver.setSync(k, v))
    },
    setSync(k, v) {
      if (v != null) {
        storage.setItem(k, JSON.stringify(v))
      }
    },
    has(k) {
      return Promise.resolve(driver.hasSync(k))
    },
    hasSync(k) {
      return storage.getItem(k) != null
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
    count() {
      return Promise.resolve(driver.countSync())
    },
    countSync() {
      return storage.length
    },
    keys() {
      return Promise.resolve(driver.keysSync())
    },
    keysSync() {
      const keys = []
      for (let i = 0, len = storage.length; i < len; i++) {
        keys.push(storage.key(i))
      }
      return keys
    },
  }
  return driver
}

export const getBrowserLocalStorageDriver: GetStorageDriver = () => getBrowserStorageDriver('local')

export const getBrowserSessionStorageDriver: GetStorageDriver = () => getBrowserStorageDriver('session')

export const getWeappStorageDriver: GetStorageDriver = () => ({
  set(k, v) {
    return new Promise((resolve, reject) => {
      wx.setStorage({
        key: k,
        data: v,
        success: resolve,
        fail: reject,
      })
    })
  },
  setSync(k, v) {
    if (v != null) {
      wx.setStorageSync(k, v)
    }
  },
  has(k) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: k,
        success: res => {
          resolve(res.data != null)
        },
        fail: reject,
      })
    })
  },
  hasSync(k) {
    return wx.getStorageSync(k) != null
  },
  get(k) {
    return new Promise((resolve, reject) => {
      wx.getStorage({
        key: k,
        success: res => {
          resolve(res.data)
        },
        fail: reject,
      })
    })
  },
  getSync(k) {
    return wx.getStorageSync(k)
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
  count() {
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success: res => {
          resolve(res.data.keys.length)
        },
        fail: reject,
      })
    })
  },
  countSync() {
    return wx.getStorageInfoSync().keys.length
  },
  keys() {
    return new Promise((resolve, reject) => {
      wx.getStorageInfo({
        success: res => {
          resolve(res.data.keys)
        },
        fail: reject,
      })
    })
  },
  keysSync() {
    return wx.getStorageInfoSync().keys
  },
})

export const getMemoryStorageDriver: GetStorageDriver = () => {
  const storage = Object.create(null)
  return reduce(
    {
      setSync(k, v) {
        if (v != null) {
          storage[k] = v
        }
      },
      hasSync(k) {
        return (k in storage)
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
      countSync() {
        return Object.keys(storage).length
      },
      keysSync() {
        return Object.keys(storage)
      },
    } as Partial<StorageDriver>,
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
  private driver: StorageDriver

  constructor(private driverGetterOrOptions: GetStorageDriver | StorageOptions) {
    this.driver = (isObject(driverGetterOrOptions) && isObject((driverGetterOrOptions as StorageOptions).driver))
      ? (driverGetterOrOptions as StorageOptions).driver
      : (driverGetterOrOptions as GetStorageDriver)()
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
}
