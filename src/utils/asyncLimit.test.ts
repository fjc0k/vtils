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
    const getIdLimit = asyncLimit(getId)
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
    const getIdLimit = asyncLimit(getId, { concurrency: 1 })
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
    const getIdLimit = asyncLimit(getId, { concurrency: 2 })
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

  test('按分组并行执行', async () => {
    const doneOrder: string[] = []
    const getId = async (group: string, id: number) => {
      await wait(500)
      doneOrder.push(`${group}-${id}`)
      return id
    }

    const getIdLimit = asyncLimit(getId, {
      concurrency: 1,
      groupBy: group => group,
    })

    const pa = Promise.all([
      getIdLimit('a', 1),
      getIdLimit('a', 2),
      getIdLimit('b', 1),
      getIdLimit('b', 2),
    ])

    await wait(550)
    expect(doneOrder).toHaveLength(2)
    expect(doneOrder).toContain('a-1')
    expect(doneOrder).toContain('b-1')
    expect(doneOrder).not.toContain('a-2')
    expect(doneOrder).not.toContain('b-2')

    await wait(550)
    expect(doneOrder).toHaveLength(4)
    expect(doneOrder).toContain('a-2')
    expect(doneOrder).toContain('b-2')

    await pa
  })

  test('qps 限流正常', async () => {
    const getId = async (id: number) => id
    const getIdLimit = asyncLimit(getId, { qps: 2 })
    const done: number[] = []

    const pa = Promise.all(
      [1, 2, 3, 4, 5].map(id => getIdLimit(id).then(() => done.push(id))),
    )

    // 第一秒内最多执行 2 次
    await wait(300)
    expect(done).toHaveLength(2)

    // 1 秒后放行剩下的
    await wait(800)
    expect(done).toHaveLength(4)

    await pa
    expect(done).toHaveLength(5)
  })

  test('qps 限流不受调用结束时间影响', async () => {
    const getId = async (id: number) => {
      await wait(10)
      return id
    }
    const getIdLimit = asyncLimit(getId, { qps: 1 })
    const done: number[] = []

    const pa = Promise.all(
      [1, 2, 3].map(id => getIdLimit(id).then(() => done.push(id))),
    )

    // 任务 10ms 就结束了，但 1 秒内仍只能启动 1 次
    await wait(300)
    expect(done).toHaveLength(1)

    await pa
    expect(done).toHaveLength(3)
  })

  test('qps 按分组限流', async () => {
    const doneOrder: string[] = []
    const getId = async (group: string, id: number) => {
      doneOrder.push(`${group}-${id}`)
      return id
    }

    const getIdLimit = asyncLimit(getId, {
      qps: 1,
      groupBy: group => group,
    })

    const pa = Promise.all([getIdLimit('a', 1), getIdLimit('b', 1)])

    await wait(300)
    expect(doneOrder).toHaveLength(2)
    expect(doneOrder).toContain('a-1')
    expect(doneOrder).toContain('b-1')

    await pa
  })

  test('qpsWindow 加长限流窗口', async () => {
    const getId = async (id: number) => id
    const getIdLimit = asyncLimit(getId, { qps: 2, qpsWindow: 1200 })
    const done: number[] = []

    const pa = Promise.all(
      [1, 2, 3, 4].map(id => getIdLimit(id).then(() => done.push(id))),
    )

    // 第一秒内最多执行 2 次
    await wait(1100)
    expect(done).toHaveLength(2)

    // 1.2 秒后放行剩下的
    await wait(200)
    expect(done).toHaveLength(4)

    await pa
    expect(done).toHaveLength(4)
  })

  test('concurrency 和 qps 不能同时传入', () => {
    const getId = async (id: number) => id
    expect(() => asyncLimit(getId, { concurrency: 1, qps: 1 })).toThrowError(
      TypeError,
    )
  })
})
