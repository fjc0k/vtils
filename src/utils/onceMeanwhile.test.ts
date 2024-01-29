import { onceMeanwhile } from './onceMeanwhile.ts'
import { wait } from './wait.ts'

describe('onceMeanwhile', () => {
  test('表现正常', async () => {
    const fn: () => Promise<1> = jest.fn().mockImplementation(async () => {
      await wait(50)
      return 1
    })
    const fn$ = onceMeanwhile(fn)

    const res = await Promise.all([fn$(), fn$(), fn$(), fn$()])
    expect(res).toEqual([1, 1, 1, 1])
    expect(fn).toBeCalled().toBeCalledTimes(1)

    const r = await fn$()
    expect(r).toEqual(1)
    expect(fn).toBeCalled().toBeCalledTimes(2)
  })
})
