import { EasyStorageAdapter } from './EasyStorageAdapter'

export class EasyStorageAdapterMemory extends EasyStorageAdapter {
  private static storage = Object.create(null)

  set(k: string, v: any) {
    return Promise.resolve(this.setSync(k, v))
  }

  setSync(k: string, v: any) {
    if (v != null) {
      EasyStorageAdapterMemory.storage[k] = v
    }
  }

  get(k: string) {
    return Promise.resolve(this.getSync(k))
  }

  getSync(k: string) {
    return (k in EasyStorageAdapterMemory.storage) ? EasyStorageAdapterMemory.storage[k] : null
  }

  remove(k: string) {
    return Promise.resolve(this.removeSync(k))
  }

  removeSync(k: string) {
    delete EasyStorageAdapterMemory.storage[k]
  }

  clear() {
    return Promise.resolve(this.clearSync())
  }

  clearSync() {
    Object.keys(EasyStorageAdapterMemory.storage).forEach(k => {
      delete EasyStorageAdapterMemory.storage[k]
    })
  }
}
