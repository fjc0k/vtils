import { renderHook } from '@testing-library/react-hooks'
import { useClassName } from './useClassName.ts'

describe('useClassName', () => {
  test('仅保留不为空的字符串类名', () => {
    const { result } = renderHook(() =>
      useClassName(
        () => ['a', false, undefined, null, 1, 'b', {}, [], ['c'], /ff/, ''],
        [],
      ),
    )

    expect(result.current).toBe('a b')
  })

  test('计算后的类名列表为空时返回 undefined', () => {
    const { result } = renderHook(() =>
      useClassName(
        () => ['', false, undefined, null, 1, {}, [], ['c'], /ff/],
        [],
      ),
    )

    expect(result.current).toBe(undefined)
  })

  test('计算后的类名列表为 undefined 则返回 undefined', () => {
    const { result } = renderHook(() => useClassName(() => undefined, []))

    expect(result.current).toBe(undefined)
  })

  test('若依赖更新则重新生成类名', () => {
    const { result, rerender } = renderHook(
      ({ disabled }) =>
        useClassName(() => ['button', disabled && 'disabled'], [disabled]),
      {
        initialProps: {
          disabled: false,
        },
      },
    )

    expect(result.current).toBe('button')

    rerender({ disabled: true })

    expect(result.current).toBe('button disabled')
  })
})
