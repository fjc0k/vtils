import { act, renderHook } from '@testing-library/react-hooks'
import { useToggle } from './useToggle'

describe('useToggle', () => {
  test('可设置默认值为 false', () => {
    const { result: resultFalse } = renderHook(() => useToggle(false))
    expect(resultFalse.current[0]).toBeFalse()
  })

  test('可设置默认值为 true', () => {
    const { result: resultTrue } = renderHook(() => useToggle(true))
    expect(resultTrue.current[0]).toBeTrue()
  })

  test('*.toggle() 可正常切换值', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current[0]).toBeFalse()
    act(() => result.current[1]())
    expect(result.current[0]).toBeTrue()
  })

  test('*.set() 可正常设置值', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current[0]).toBeFalse()
    act(() => result.current[1].set(false))
    expect(result.current[0]).toBeFalse()
    act(() => result.current[1].set(true))
    expect(result.current[0]).toBeTrue()
    act(() => result.current[1].set(false))
    expect(result.current[0]).toBeFalse()
  })

  test('*.true() 可正常切换值为 true', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current[0]).toBeFalse()
    act(() => result.current[1].true())
    expect(result.current[0]).toBeTrue()
  })

  test('*.false() 可正常切换值为 false', () => {
    const { result } = renderHook(() => useToggle(false))
    expect(result.current[0]).toBeFalse()
    act(() => result.current[1].false())
    expect(result.current[0]).toBeFalse()
  })
})
