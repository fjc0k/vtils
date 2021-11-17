import { signal } from './signal'
import { wait } from './wait'

describe('signal', () => {
  test('表现正常', async () => {
    let _userData = ''
    const userData = signal<string>()
    userData.get().then(v => (_userData = v))
    await wait(0)
    expect(_userData).toBe('')
    userData.set('test')
    await wait(0)
    expect(_userData).toBe('test')
    userData.set('test2')
    await wait(0)
    expect(_userData).toBe('test')
    userData.get().then(v => (_userData = v))
    await wait(0)
    expect(_userData).toBe('test2')
    userData.throw('err')
    await expect(userData.get()).rejects.toContain('err')
  })
})
