import * as Taro from '@tarojs/taro-h5'
import {AnyFunction} from '../enhanceType'
import {EasyStorage} from './EasyStorage'
import {EasyStorageAdapterBrowserLocalStorage, EasyStorageAdapterBrowserSessionStorage} from './EasyStorageAdapterBrowser'
import {EasyStorageAdapterMemory} from './EasyStorageAdapterMemory'
import {EasyStorageAdapterWeapp} from './EasyStorageAdapterWeapp'
import {ii} from '../ii'

ii(function patchWX() {
  const originalTaroGetStorage = Taro.getStorage

  Object.defineProperties(Taro, {
    getStorage: {
      value: (...args: any[]) => {
        return (originalTaroGetStorage as any)(...args).catch(() => {})
      },
    },
    clearStorage: {
      value: (options: { success: AnyFunction }) => {
        localStorage.clear()
        options.success && options.success()
      },
    },
  })

  ;(global as any).wx = Taro
})

type StorageValues = {
  str: string,
  num: number,
  bool: boolean,
  obj: object,
  arr: any[],
}

type StorageKey = keyof StorageValues

const storageKeys: StorageKey[] = ['str', 'num', 'bool', 'obj', 'arr']

const adapters = [
  EasyStorageAdapterBrowserLocalStorage,
  EasyStorageAdapterBrowserSessionStorage,
  EasyStorageAdapterMemory,
  EasyStorageAdapterWeapp,
]

adapters.forEach(Adapter => {
  describe(Adapter.name, () => {
    const storage = new EasyStorage<StorageValues>(new Adapter())

    test('键值不存在时返回 null', async () => {
      await Promise.all(
        storageKeys.map(async key => {
          expect(await storage.get(key)).toBeNull()
          expect(storage.getSync(key)).toBeNull()
        }),
      )
    })

    test('键值不存在且设置了默认值时返回默认值', async () => {
      await Promise.all(
        storageKeys.map(async key => {
          expect(await storage.get(key, 'dv')).toBe('dv')
          expect(storage.getSync(key, 'dv')).toBe('dv')
        }),
      )
    })

    test('键值存在时正确返回其值', async () => {
      const storageValues: StorageValues = {
        str: 'str',
        num: 100,
        bool: true,
        obj: {x: 1, y: '3'},
        arr: [3, {2: 4}, false, 'hello'],
      }
      await Promise.all(
        storageKeys.map(async (key, index) => {
          if (index % 2) {
            await storage.set(key, storageValues[key])
          } else {
            storage.setSync(key, storageValues[key])
          }
        }),
      )
      await Promise.all(
        storageKeys.map(async key => {
          expect(await storage.get(key)).toEqual(storageValues[key])
          expect(storage.getSync(key)).toEqual(storageValues[key])
        }),
      )
    })

    test('可删除存储的值', async () => {
      await Promise.all(
        storageKeys.map(async (key, index) => {
          if (index % 2) {
            await storage.remove(key)
          } else {
            storage.removeSync(key)
          }
          expect(await storage.get(key)).toBeNull()
        }),
      )
    })

    test('可清空存储的值', async () => {
      await storage.set('str', 'test')
      expect(await storage.get('str')).toBe('test')
      await storage.clear()
      expect(await storage.get('str')).toBeNull()
      storage.setSync('str', 'test')
      expect(storage.getSync('str')).toBe('test')
      storage.clearSync()
      expect(storage.getSync('str')).toBeNull()
    })

    test('可记住获取的值', async () => {
      expect(await storage.get('str')).toBeNull()
      expect(await storage.getRemember('str')).toBeNull()
      expect(await storage.getRemember('str', () => 'hello')).toBe('hello')
      expect(storage.getSync('str', () => 'hello2')).toBe('hello')
      expect(await storage.get('str')).toBe('hello')
      storage.removeSync('str')
      expect(await storage.get('str')).toBeNull()
      expect(storage.getRememberSync('str')).toBeNull()
      expect(storage.getRememberSync('str', 'hello')).toBe('hello')
      expect(await storage.get('str', 'hello2')).toBe('hello')
      expect(storage.getSync('str')).toBe('hello')
    })
  })
})
