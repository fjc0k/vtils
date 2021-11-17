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

  test('多个初始 get 表现正常', async () => {
    let _userData = ''
    let _userData2 = ''
    const userData = signal<string>()
    userData.get().then(v => (_userData = v))
    userData.get().then(v => (_userData2 = v))
    await wait(0)
    expect(_userData).toBe('')
    expect(_userData2).toBe('')
    userData.set('test')
    await wait(0)
    expect(_userData).toBe('test')
    expect(_userData2).toBe('test')
  })
})
