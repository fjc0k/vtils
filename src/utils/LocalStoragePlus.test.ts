import { LocalStoragePlus } from './LocalStoragePlus'
import { wait } from './wait'

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
      ttl: 10,
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
    await wait(20)
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
})
