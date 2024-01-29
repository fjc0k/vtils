import { LocalStoragePlus } from './LocalStoragePlus.ts'
import { wait } from './wait.ts'

describe('LocalStoragePlus', () => {
  test('普通正常', () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'normal',
    })

    expect(countStorage.get()).toBe(null)

    countStorage.set(2)
    expect(countStorage.get()).toBe(2)
    expect(countStorage.has()).toBe(true)

    countStorage.remove()
    expect(countStorage.get()).toBe(null)
    expect(countStorage.has()).toBe(false)
  })

  test('ttl 正常', async () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'ttl',
    })

    expect(countStorage.get()).toBe(null)

    countStorage.set(2, {
      ttl: 10,
    })
    expect(countStorage.get()).toBe(2)
    await wait(20)
    expect(countStorage.get()).toBe(null)
  })

  test('tag 正常', async () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'tag',
    })

    expect(countStorage.get()).toBe(null)

    countStorage.set(2, {
      tag: '1',
    })
    expect(countStorage.get()).toBe(2)
    expect(
      countStorage.get({
        tag: '1',
      }),
    ).toBe(2)
    expect(
      countStorage.get({
        tag: '2',
      }),
    ).toBe(null)

    countStorage.remove()
    expect(countStorage.get()).toBe(null)
  })

  test('ttl & tag 正常', async () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'ttl-tag',
    })

    expect(countStorage.get()).toBe(null)

    countStorage.set(2, {
      ttl: 100,
      tag: '1',
    })
    expect(countStorage.get()).toBe(2)
    expect(
      countStorage.get({
        tag: '1',
      }),
    ).toBe(2)
    expect(
      countStorage.get({
        tag: '2',
      }),
    ).toBe(null)
    await wait(120)
    expect(countStorage.get()).toBe(null)
    expect(
      countStorage.get({
        tag: '1',
      }),
    ).toBe(null)
    expect(
      countStorage.get({
        tag: '2',
      }),
    ).toBe(null)
  })

  test('increase 正常', () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'increase',
    })
    expect(countStorage.get()).toBe(null)
    countStorage.increase()
    expect(countStorage.get()).toBe(1)
    countStorage.increase(2)
    expect(countStorage.get()).toBe(3)
    countStorage.increase(2)
    expect(countStorage.get()).toBe(5)
    countStorage.increase(-5)
    expect(countStorage.get()).toBe(0)
  })

  test('decrease 正常', () => {
    const countStorage = new LocalStoragePlus<number>({
      key: 'decrease',
    })
    expect(countStorage.get()).toBe(null)
    countStorage.decrease()
    expect(countStorage.get()).toBe(-1)
    countStorage.decrease(2)
    expect(countStorage.get()).toBe(-3)
    countStorage.decrease(2)
    expect(countStorage.get()).toBe(-5)
    countStorage.decrease(-5)
    expect(countStorage.get()).toBe(0)
  })

  test('静态方法正常', () => {
    expect(LocalStoragePlus.get<number>('s')).toBe(null)
    expect(LocalStoragePlus.has('s')).toBe(false)
    LocalStoragePlus.set<number>('s', 1)
    expect(LocalStoragePlus.has('s')).toBe(true)
    expect(LocalStoragePlus.get<number>('s')).toBe(1)
    LocalStoragePlus.set<number>('s', s => (s || 0) + 2)
    expect(LocalStoragePlus.get<number>('s')).toBe(3)
    LocalStoragePlus.remove('s')
    expect(LocalStoragePlus.has('s')).toBe(false)
    LocalStoragePlus.set<number>('s', s => (s || 0) + 2)
    expect(LocalStoragePlus.get<number>('s')).toBe(2)
    LocalStoragePlus.clear()
    expect(LocalStoragePlus.has('s')).toBe(false)
    expect(LocalStoragePlus.get<number>('s')).toBe(null)
    LocalStoragePlus.increase('s')
    expect(LocalStoragePlus.get<number>('s')).toBe(1)
    LocalStoragePlus.decrease('s')
    expect(LocalStoragePlus.get<number>('s')).toBe(0)
  })
})
