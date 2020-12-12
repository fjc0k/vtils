import * as Taro from '@tarojs/taro'
import { AnyFunction } from '../types'
import { renderHook } from '@testing-library/react-hooks'

describe('useSearchParam.taro', () => {
  const useRouter: AnyFunction = jest.fn().mockImplementation(() => {
    return {
      params: {
        id: '789',
      },
    }
  })

  beforeAll(() => {
    jest.doMock(
      '@tarojs/taro',
      () =>
        ({
          useRouter: useRouter,
        } as typeof Taro),
    )
  })

  test('表现正常', async () => {
    const { useSearchParam } = await import('./useSearchParam.taro')
    const { result } = renderHook(() => {
      return useSearchParam('id')
    })

    expect(result.current).toBe('789')
  })
})
