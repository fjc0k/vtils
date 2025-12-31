import { asyncMemoize } from './asyncMemoize'
import { wait } from './wait'

describe('asyncMemoize', () => {
  test('ok', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      return id
    }
    const fnMemoized = asyncMemoize(fn)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(3)).toBe(3)
    expect(i).toBe(2)

    expect(await fnMemoized(3)).toBe(3)
    expect(i).toBe(2)

    expect(await fnMemoized(3)).toBe(3)
    expect(i).toBe(2)

    expect(await fnMemoized(4)).toBe(4)
    expect(i).toBe(3)
  })

  test('不缓存报错', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      throw new Error(`${id}`)
    }
    const fnMemoized = asyncMemoize(fn)

    await expect(fnMemoized(2)).rejects.toThrowError('2')
    expect(i).toBe(1)

    await expect(fnMemoized(2)).rejects.toThrowError('2')
    expect(i).toBe(2)
  })

  test('支持 cacheKey', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      return id
    }
    const fnMemoized = asyncMemoize(fn, {
      cacheKey: id => (id <= 3 ? 2 : id),
    })

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(3)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(4)).toBe(4)
    expect(i).toBe(2)

    expect(await fnMemoized(5)).toBe(5)
    expect(i).toBe(3)
  })

  test('支持 cacheTTL', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      return id
    }
    const fnMemoized = asyncMemoize(fn, {
      cacheTTL: 30,
    })

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    await wait(50)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(2)
  })

  test('支持外部管理缓存', async () => {
    const fn = jest.fn().mockImplementation(async () => 1)
    const fnMemoized = asyncMemoize(fn)

    await fnMemoized()
    expect(fn).toBeCalled().toBeCalledTimes(1)

    await fnMemoized()
    expect(fn).toBeCalled().toBeCalledTimes(1)

    fnMemoized.cache.clear()
    await fnMemoized()
    expect(fn).toBeCalled().toBeCalledTimes(2)
  })

  test('支持 cacheTTL 函数', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      return id
    }
    const fnMemoized = asyncMemoize(fn, {
      cacheTTL: result => {
        if (result === 2) {
          return 30
        }
        return -1
      },
    })

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(1)

    await wait(50)

    expect(await fnMemoized(2)).toBe(2)
    expect(i).toBe(2)

    expect(await fnMemoized(3)).toBe(3)
    expect(i).toBe(3)

    expect(await fnMemoized(3)).toBe(3)
    expect(i).toBe(4)
  })

  test('支持 while-pending', async () => {
    let i = 0
    const fn = async (id: number) => {
      i++
      await wait(50)
      return id
    }
    const fnMemoized = asyncMemoize(fn, {
      cacheTTL: 'while-pending',
    })

    const p1 = fnMemoized(2)
    const p2 = fnMemoized(2)
    expect(p1).toBe(p2)
    expect(i).toBe(1)

    const r1 = await p1
    const r2 = await p2
    expect(i).toBe(1)
    expect(r1).toBe(2)
    expect(r2).toBe(2)

    await wait(60)

    const p3 = fnMemoized(2)
    expect(p3).not.toBe(p1)
    expect(i).toBe(2)

    const r3 = await p3
    expect(i).toBe(2)
    expect(r3).toBe(2)
  })
})
