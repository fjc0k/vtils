import { run } from './run'
import { wait } from './wait'

describe('wait', () => {
  test('表现正常', async () => {
    const start = Date.now()
    await wait(110)
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

describe('wait.reject', () => {
  test('表现正常', async () => {
    const start = Date.now()
    const [err] = await run(() => wait.reject(110))
    expect(err).not.toBeNull()
    const end = Date.now()
    expect(end - start >= 100).toBeTrue()
  })

  test('可取消等待', async () => {
    const cb = jest.fn()
    const w = wait.reject(100)
    w.catch(cb)
    w.cancel()
    await wait(100)
    expect(cb).not.toBeCalled()
  })
})
