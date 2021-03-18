import { createSubmit } from './createSubmit'

describe('createSubmit', () => {
  test('表现正常', async () => {
    const start = jest.fn()
    const fail = jest.fn()
    const success = jest.fn().mockImplementation(async () => 0)
    const complete = jest.fn()

    const submit = createSubmit({
      start,
      fail,
      success,
      complete,
    })

    await submit(async _ => {
      await _.start('开始')
      await _.fail('失败', 10)
      await _.success('成功', 20)
    })

    expect(start).toBeCalled().toBeCalledTimes(1).toBeCalledWith('开始')
    expect(fail).toBeCalled().toBeCalledTimes(1).toBeCalledWith('失败', 10)
    expect(success).toBeCalled().toBeCalledTimes(1).toBeCalledWith('成功', 20)
    expect(complete).toBeCalled().toBeCalledTimes(1)
  })

  test('异常回调', async () => {
    let error = ''
    const submit = createSubmit({
      start: jest.fn(),
      fail: jest.fn(),
      success: jest.fn(),
      complete: jest.fn(),
      throw: (err: string) => (error = err),
    })
    try {
      await submit(async () => {
        throw 'hello'
      })
    } catch {}
    expect(error).toBe('hello')
  })
})
