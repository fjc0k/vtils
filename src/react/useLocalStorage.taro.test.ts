import * as Taro from '@tarojs/taro'
import { act, renderHook } from '@testing-library/react-hooks'

describe('useLocalStorage', () => {
  const storage: Record<any, any> = {}

  beforeAll(() => {
    jest.doMock(
      '@tarojs/taro',
      () =>
        ({
          getStorageSync: key => {
            return storage[key]
          },
          removeStorage: payload => {
            delete storage[payload.key]
          },
          setStorage: payload => {
            storage[payload.key] = payload.data
          },
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useLocalStorage } = await import('./useLocalStorage.taro.ts')
    const { result: resx } = renderHook(() => useLocalStorage<string>('x'))
    expect(resx.current[0]).toBe(undefined)
    act(() => resx.current[1]('1'))
    expect(resx.current[0]).toBe('1')
    act(() => resx.current[1](prev => `${prev}_2`))
    expect(resx.current[0]).toBe('1_2')
    act(() => resx.current[2]())
    expect(resx.current[0]).toBe(undefined)

    const { result: resy } = renderHook(() => useLocalStorage('y', 5))
    expect(resy.current[0]).toBe(5)
    act(() => resy.current[1](1))
    expect(resy.current[0]).toBe(1)
    act(() => resy.current[1](prev => prev + 2))
    expect(resy.current[0]).toBe(3)
    act(() => resy.current[2]())
    expect(resy.current[0]).toBe(5)
  })
})
