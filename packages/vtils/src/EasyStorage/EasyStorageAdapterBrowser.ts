import {EasyStorageAdapter} from './EasyStorageAdapter'

export class EasyStorageAdapterBrowser extends EasyStorageAdapter {
  constructor(private storage: Storage) {
    super()
  }

  set(k: string, v: any) {
    return Promise.resolve(this.setSync(k, v))
  }

  setSync(k: string, v: any) {
    if (v != null) {
      this.storage.setItem(k, JSON.stringify(v))
    }
  }

  get(k: string) {
    return Promise.resolve(this.getSync(k))
  }

  getSync(k: string) {
    let value = null
    try {
      value = JSON.parse(this.storage.getItem(k)!)
    } catch (err) {}
    return value
  }

  remove(k: string) {
    return Promise.resolve(this.removeSync(k))
  }

  removeSync(k: string) {
    this.storage.removeItem(k)
  }

  clear() {
    return Promise.resolve(this.clearSync())
  }

  clearSync() {
    this.storage.clear()
  }
}

export class EasyStorageDriverBrowserLocalStorage extends EasyStorageAdapterBrowser {
  constructor() {
    super(localStorage)
  }
}

export class EasyStorageDriverBrowserSessionStorage extends EasyStorageAdapterBrowser {
  constructor() {
    super(sessionStorage)
  }
}
