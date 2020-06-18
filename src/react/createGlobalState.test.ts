import { act, renderHook } from '@testing-library/react-hooks'
import { createGlobalState } from './createGlobalState'

describe('createGlobalState', () => {
  describe('有初始值', () => {
    const useGlobalName = createGlobalState('')

    test('getState 正常', () => {
      expect(useGlobalName.getState()).toBe('')
    })

    test('setState 正常', () => {
      useGlobalName.setState('Jay')
      expect(useGlobalName.getState()).toBe('Jay')
    })

    test('跨组件状态共享正常', () => {
      const { result: result1 } = renderHook(() => useGlobalName())
      const { result: result2 } = renderHook(() => useGlobalName())
      const { result: result3 } = renderHook(() => useGlobalName())

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])

      act(() => result2.current[1]('Fong'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('Fong')

      act(() => result1.current[1](() => 'jj'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('jj')
    })
  })

  describe('无初始值', () => {
    const useGlobalName = createGlobalState<string>()

    test('getState 正常', () => {
      expect(useGlobalName.getState()).toBe(undefined)
    })

    test('setState 正常', () => {
      useGlobalName.setState('Jay')
      expect(useGlobalName.getState()).toBe('Jay')
    })

    test('跨组件状态共享正常', () => {
      const { result: result1 } = renderHook(() => useGlobalName())
      const { result: result2 } = renderHook(() => useGlobalName())
      const { result: result3 } = renderHook(() => useGlobalName())

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])

      act(() => result2.current[1]('Fong'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('Fong')

      act(() => result1.current[1](() => 'jj'))

      expect(useGlobalName.getState())
        .toBe(result1.current[0])
        .toBe(result2.current[0])
        .toBe(result3.current[0])
        .toBe('jj')
    })
  })
})
