import { act, renderHook } from '@testing-library/react-hooks'
import { useControllableValue } from './useControllableValue'
import { useSetState } from 'react-use'

describe('useControllableValue', () => {
  test('表现正常', () => {
    const { result } = renderHook(() => {
      const [props, updateProps] = useSetState<
        Partial<{
          value: string
          defaultValue: string
          onChange: (value: string) => any
        }>
      >({
        defaultValue: '0',
        onChange: value => {
          updateProps({ value })
        },
      })
      const [value, setValue] = useControllableValue(
        props,
        'defaultValue',
        'value',
        'onChange',
      )
      return { props, value, setValue, updateProps }
    })
    expect(result.current.value).toBe('0')
    act(() => result.current.updateProps({ defaultValue: '0.1' }))
    expect(result.current.value).toBe('0')
    act(() => result.current.setValue('1'))
    expect(result.current.props.value).toBe(result.current.value).toBe('1')
    act(() => result.current.updateProps({ value: '2' }))
    expect(result.current.props.value).toBe(result.current.value).toBe('2')
  })
})
