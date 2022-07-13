import { loopUntil, LoopUntilRetryLimitExceededError } from './loopUntil'

describe('loopUntil', () => {
  test('同步正常', async () => {
    let i = 0
    const getNumber = () => i++
    expect(
      await loopUntil(
        () => getNumber(),
        num => num === 10,
        {
          retryDelay: 0,
        },
      ),
    ).toBe(10)
  })

  test('异步正常', async () => {
    let i = 0
    const getNumberAsync = async () => i++
    expect(
      await loopUntil(
        () => getNumberAsync(),
        async num => num === 10,
        {
          retryDelay: 0,
        },
      ),
    ).toBe(10)
  })

  test('重试次数限制', async () => {
    let i = 0
    const getNumberAsync = async () => i++
    await expect(
      loopUntil(
        () => getNumberAsync(),
        num => num === 10,
        {
          retryDelay: 0,
          retryLimit: 5,
        },
      ),
    ).rejects.toBeInstanceOf(LoopUntilRetryLimitExceededError)
    expect(i).toBe(6)
  })

  test('异步正常2', async () => {
    const i = 0
    const fn = jest.fn().mockImplementation(
      () =>
        // @ts-ignore
        i === 0,
    )
    expect(
      await loopUntil(fn, {
        retryDelay: 0,
        retryLimit: 1,
      }),
    ).toBe(undefined)
    expect(fn).toBeCalled()
  })
})
