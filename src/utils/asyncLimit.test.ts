import { asyncLimit } from './asyncLimit'
import { wait } from './wait'

describe('asyncLimit', () => {
  test('调用正常', async () => {
    const getId = async (id: number) => {
      if (id === 10) {
        throw new Error('错误')
      }
      return id
    }
    const getIdLimit = asyncLimit(getId, 1)
    expect(await getIdLimit(1)).toBe(1)
    expect(await getIdLimit(2)).toBe(2)
    expect(await Promise.all([getIdLimit(2), getIdLimit(3)])).toEqual([2, 3])

    await expect(getIdLimit(10)).rejects.toThrowError('错误')
    await expect(
      Promise.all([getIdLimit(2), getIdLimit(10)]),
    ).rejects.toThrowError('错误')

    expect(await getIdLimit(2)).toBe(2)
  })

  test('限制正常', async () => {
    const getId = async (id: number) => {
      await wait(500)
      return id
    }
    const getIdLimit = asyncLimit(getId, 1)
    let id1 = 0
    let id2 = 0
    let id3 = 0
    const pa = Promise.all([
      getIdLimit(1).then(() => (id1 = 1)),
      getIdLimit(2).then(() => (id2 = 2)),
      getIdLimit(3).then(() => (id3 = 3)),
    ])
    expect(id1).toBe(0)
    expect(id2).toBe(0)
    expect(id3).toBe(0)

    await wait(550)
    expect(id1).toBe(1)
    expect(id2).toBe(0)
    expect(id3).toBe(0)

    await wait(550)
    expect(id1).toBe(1)
    expect(id2).toBe(2)
    expect(id3).toBe(0)

    await pa

    expect(id1).toBe(1)
    expect(id2).toBe(2)
    expect(id3).toBe(3)
  })

  test('限制正常2', async () => {
    const getId = async (id: number) => {
      await wait(500)
      return id
    }
    const getIdLimit = asyncLimit(getId, 2)
    let id1 = 0
    let id2 = 0
    let id3 = 0
    let id4 = 0
    const pa = Promise.all([
      getIdLimit(1).then(() => (id1 = 1)),
      getIdLimit(2).then(() => (id2 = 2)),
      getIdLimit(3).then(() => (id3 = 3)),
    ])
    expect(id1).toBe(0)
    expect(id2).toBe(0)
    expect(id3).toBe(0)

    wait(100).then(() => {
      getIdLimit(4).then(() => (id4 = 4))
    })

    await wait(550)
    expect(id1).toBe(1)
    expect(id2).toBe(2)
    expect(id3).toBe(0)
    expect(id4).toBe(0)

    await wait(550)
    expect(id1).toBe(1)
    expect(id2).toBe(2)
    expect(id3).toBe(3)
    expect(id4).toBe(4)

    await pa

    expect(id1).toBe(1)
    expect(id2).toBe(2)
    expect(id3).toBe(3)
    expect(id4).toBe(4)
  })
})
