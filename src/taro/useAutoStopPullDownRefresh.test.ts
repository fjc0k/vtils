import * as Taro from '@tarojs/taro'
import { renderHook } from '@testing-library/react-hooks'
import { wait } from '../utils'

describe('useAutoStopPullDownRefresh', () => {
  let callback: () => any
  const usePullDownRefresh: any = jest.fn().mockImplementation(cb => {
    callback = cb
  })
  const stopPullDownRefresh: any = jest.fn()

  beforeAll(() => {
    jest.mock(
      '@tarojs/taro',
      () =>
        ({
          usePullDownRefresh,
          stopPullDownRefresh,
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useAutoStopPullDownRefresh } = await import(
      './useAutoStopPullDownRefresh'
    )
    const cb = jest.fn()
    renderHook(() => useAutoStopPullDownRefresh(cb))
    expect(usePullDownRefresh).toBeCalled().toBeCalledTimes(1)
    expect(stopPullDownRefresh).not.toBeCalled()
    expect(callback).toBeFunction()
    callback()
    expect(stopPullDownRefresh).toBeCalled().toBeCalledTimes(1)
    expect(cb).toBeCalled().toBeCalledTimes(1)

    const cbAsync = jest.fn().mockImplementation(async () => wait(10))
    renderHook(() => useAutoStopPullDownRefresh(cbAsync))
    callback()
    expect(cbAsync).toBeCalled().toBeCalledTimes(1)
    expect(stopPullDownRefresh).toBeCalled().toBeCalledTimes(1)
    await wait(11)
    expect(stopPullDownRefresh).toBeCalled().toBeCalledTimes(2)
  })
})
