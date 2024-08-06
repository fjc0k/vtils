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
})
