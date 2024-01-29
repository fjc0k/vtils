import * as Taro from '@tarojs/taro'
import { renderHook } from '@testing-library/react-hooks'
import { AnyFunction } from '../types/index.ts'

describe('useReachBottom.taro', () => {
  let useReachBottomCb: AnyFunction
  const useReachBottom: AnyFunction = jest
    .fn()
    .mockImplementation((cb: AnyFunction) => {
      useReachBottomCb = cb
    })

  beforeAll(() => {
    jest.doMock(
      '@tarojs/taro',
      () =>
        ({
          useReachBottom: useReachBottom,
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useReachBottom } = await import('./useReachBottom.taro.ts')
    const cb = jest.fn()
    renderHook(() => useReachBottom(cb))
    // 初始立即触发一次
    expect(cb).toBeCalled().toBeCalledTimes(1)
    expect(useReachBottomCb).toBeFunction().toBe(cb)
  })
})
