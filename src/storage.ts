import inBrowser from './inBrowser'
import inWechatMiniProgram from './inWechatMiniProgram'
import isNil from './isNil'
import isUndefined from './isUndefined'
import noop from './noop'
import result from './result'
import toDate from './toDate'

export interface StorageDriver {
  get(key: string): any,
  set(key: string, value: string): void,
  remove(key: string): void,
  clear(): void,
}

const storageDriver: StorageDriver = (
  inBrowser() ? {
    get: localStorage.getItem.bind(localStorage),
    set: localStorage.setItem.bind(localStorage),
    remove: localStorage.removeItem.bind(localStorage),
    clear: localStorage.clear.bind(localStorage),
  }
    : inWechatMiniProgram() ? {
      get: wx.getStorageSync.bind(wx),
      set: wx.setStorageSync.bind(wx),
      remove: wx.removeStorageSync.bind(wx),
      clear: wx.clearStorageSync.bind(wx),
    }
      : {
        get: noop,
        set: noop,
        remove: noop,
        clear: noop,
      }
)

/**
 * 操作本地存储。支持浏览器和微信小程序。
 */
const storage = {
  /**
   * 设置本地存储的值。
   *
   * @param key 键名
   * @param value 键值，当为函数时，取函数执行后的返回值
   * @param [expire] 过期时间，内部会使用 `toDate` 格式化
   */
  set(key: string, value: any, expire?: string | number | Date): void {
    value = result(value)
    if (!isUndefined(value)) {
      storageDriver.set(key, JSON.stringify({
        expire: (!isNil(expire) && toDate(expire).getTime()) || undefined,
        value,
      }))
    }
  },

  /**
   * 获取本地存储的值。
   *
   * @param key 要获取的键名
   * @param defaultValue 默认值，当为函数时，取函数执行后的返回值
   * @returns 获取到的键值
   */
  get(key: string, defaultValue: any = null): any {
    const rawValue: string = storageDriver.get(key)
    try {
      const { expire, value = defaultValue } = JSON.parse(rawValue)
      if (expire && expire < new Date().getTime()) {
        storage.remove(key)
        return result(defaultValue)
      }
      return result(value)
    } catch (err) {
      return result(rawValue != null ? rawValue : defaultValue)
    }
  },

  /**
   * 获取并设置本地存储的值。
   *
   * @param key 要获取和设置的键名
   * @param defaultValue 获取时的默认值，当为函数时，取函数执行后的返回值
   * @param [expire] 设置时的过期时间，内部会使用 `toDate` 格式化
   * @returns 获取到的键值
   */
  getRemember(key: string, defaultValue: any, expire?: string | number | Date): any {
    const value = storage.get(key, defaultValue)
    storage.set(key, value, expire)
    return value
  },

  /**
   * 移除本地存储的值。
   *
   * @param key 要移除的键名
   */
  remove(key: string): void {
    storageDriver.remove(key)
  },

  /**
   * 清空本地存储中的所有值。
   */
  clear(): void {
    storageDriver.clear()
  },
}

export default storage
