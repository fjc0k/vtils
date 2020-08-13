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
})
