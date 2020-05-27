import { wait } from './wait'

describe(wait.name, () => {
  test('表现正常', async () => {
    const start = Date.now()
    await wait(100)
    const end = Date.now()
    expect(end - start >= 100).toBeTrue()
  })

  test('可取消等待', async () => {
    const cb = jest.fn()
    const w = wait(100)
    w.then(cb)
    w.cancel()
    await wait(100)
    expect(cb).not.toBeCalled()
  })
})
