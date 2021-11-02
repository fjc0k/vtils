import { signal } from './signal'
import { wait } from './wait'

describe('signal', () => {
  test('resolve', async () => {
    let x = 0
    const s = signal<number>()
    s.then(_x => (x = _x))
    expect(x).toBe(0)
    s.resolve(2)
    await wait(0)
    expect(x).toBe(2)

    // 只会触发一次 Promise
    s.resolve(22)
    await wait(0)
    expect(x).toBe(2)
  })

  test('reject', async () => {
    const x = 0
    let err = ''
    const s = signal<number>()
    s.catch(_err => (err = _err))
    expect(x).toBe(0)
    expect(err).toBe('')
    s.reject('err')
    await wait(0)
    expect(x).toBe(0)
    expect(err).toBe('err')

    // 只会触发一次 Promise
    s.reject('err2')
    await wait(0)
    expect(err).toBe('err')
  })
})
