import {EasyStorageAdapter} from './EasyStorageAdapter'
import {isArray} from '../is'

/**
 * 微信小程序 `Storage` 适配器。
 *
 * 由于微信小程序的 `wx.getStorageSync` 方法对于不存在的项目会返回 `空字符串`，
 * 导致无法判断项目是否存在，
 * 因此，该适配器对存储的内容做了一层封装，
 * 以保证相关操作的结果可确定。
 */
export class EasyStorageAdapterWeapp extends EasyStorageAdapter {
  private static FLAG = '\u200b__EASY_STORAGE__\u200b'

  set(k: string, v: any) {
    return new Promise<void>((resolve, reject) => {
      wx.setStorage({
        key: k,
        data: [EasyStorageAdapterWeapp.FLAG, v],
        success: resolve as any,
        fail: reject,
      })
    })
  }

  setSync(k: string, v: any) {
    /* istanbul ignore else */
    if (v != null) {
      wx.setStorageSync(k, [EasyStorageAdapterWeapp.FLAG, v])
    }
  }

  get(k: string) {
    return new Promise<any>(resolve => {
      wx.getStorage({
        key: k,
        success: res => {
          resolve(
            isArray(res!.data) && res!.data[0] === EasyStorageAdapterWeapp.FLAG
              ? res!.data[1]
              : null,
          )
        },
        fail: () => resolve(null),
      })
    })
  }

  getSync(k: string) {
    try {
      const v = wx.getStorageSync(k)
      return isArray(v) && v[0] === EasyStorageAdapterWeapp.FLAG
        ? v[1]
        : null
    } catch (e) {
      /* istanbul ignore next */
      return null
    }
  }

  remove(k: string) {
    return new Promise<void>((resolve, reject) => {
      wx.removeStorage({
        key: k,
        success: resolve as any,
        fail: reject,
      })
    })
  }

  removeSync(k: string) {
    wx.removeStorageSync(k)
  }

  clear() {
    return new Promise<void>((resolve, reject) => {
      (wx.clearStorage as any)({
        success: resolve as any,
        fail: reject,
      })
    })
  }

  clearSync() {
    wx.clearStorageSync()
  }
}
