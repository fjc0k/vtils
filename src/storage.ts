import inBrowser from './inBrowser'
import inWechatMiniProgram from './inWechatMiniProgram'
import noop from './noop'

export interface StorageDriver {
  get(key: string): any,
  set(key: string, value: string): void,
  remove(key: string): void,
  clear(): void
}

const storageDriver: StorageDriver = (
  inBrowser() ? {
    get: localStorage.getItem.bind(localStorage),
    set: localStorage.setItem.bind(localStorage),
    remove: localStorage.removeItem.bind(localStorage),
    clear: localStorage.clear.bind(localStorage)
  } :
  inWechatMiniProgram() ? {
    get: wx.getStorageSync.bind(wx),
    set: wx.setStorageSync.bind(wx),
    remove: wx.removeStorageSync.bind(wx),
    clear: wx.clearStorageSync.bind(wx)
  } :
  {
    get: noop,
    set: noop,
    remove: noop,
    clear: noop
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
   * @param value 键值
   */
  set(key: string, value: any): void {
    if (value != null) {
      storageDriver.set(key, JSON.stringify(value))
    }
  },
  /**
   * 获取本地存储的值。
   *
   * @param key 要获取的键名
   * @returns 获取到的键值
   */
  get(key: string): any {
    let value = null
    try {
      value = JSON.parse(storageDriver.get(key))
    } catch (err) {}
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
  }
}

export default storage
